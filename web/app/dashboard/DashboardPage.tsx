
interface DashboardPageProps {
    email: string;
    name: string;
}

export default function DashboardPage({ email, name }: DashboardPageProps) {    
    return (
        <div>
            <h1>Dashboard</h1>
            Hello, {name}
        </div>
    )
}