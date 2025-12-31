import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
                <p className="text-sm font-medium text-emerald-600">ZeroHunger</p>
                <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to coordinate donations and deliveries.</p>
            </div>
            <LoginForm />
        </div>
    );
}
