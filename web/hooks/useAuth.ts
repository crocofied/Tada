import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useAuth = () => {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const validate = useCallback(async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            console.log(token);
            if (!token) {
                setLoading(false);
                setValidated(false);
                router.push("/");
                return "Invalid";
            }
            
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/me", { headers: { Authorization: `Bearer ${token}` } });
            setValidated(true);
            setName(response.data.firstname + " " + response.data.lastname);
            setEmail(response.data.email);
            return "Validated";
        } catch (error) {
            console.error("Validation error:", error);
            setValidated(false);
            Cookies.remove("token");
            router.push("/");
            return "Invalid";
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        validate();
    }, [validate]);

    return {
        validated,
        loading,
        name,
        email,
        validate
    };
}

export default useAuth;