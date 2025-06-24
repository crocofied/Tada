import Sidebar from "@/components/Sidebar";


interface DashboardPageProps {
    email: string;
    name: string;
}

export default function DashboardPage({ email, name }: DashboardPageProps) {    
    return (
        <Sidebar email={email} name={name}>
        <div>
            <h1>Dashboard</h1>
            Hello, {name}
        </div>
        </Sidebar>
    )
}