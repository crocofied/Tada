import axios from "axios";

const useUser = () => {

    const register = async (email: string, firstname: string, lastname: string, password: string, passwordConfirm: string): Promise<any> => {
        if (password !== passwordConfirm) {
            throw "Passwords do not match";
        }

        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, { email, firstname, lastname, password })
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            if(error.response?.data?.details !== undefined) {
                throw error.response?.data?.details[0].message;
            }
            throw error.response?.data?.error || "Registration failed";
        });
    }

     const login = async (email: string, password: string): Promise<string> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { 
                email, 
                password 
            });
            console.log(response.data.token);
            return response.data.token;  
        } catch (error: any) {
            if (error.response?.data?.details) {
                throw error.response.data.details[0].message;
            }
            throw error.response?.data?.error || "Login failed";
        }
    }

    return { register, login };

}


export default useUser;