import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
                <p className="text-sm font-medium text-emerald-600">ZeroHunger</p>
                <h1 className="text-4xl font-bold tracking-tight">Join the Movement</h1>
                <p className="text-muted-foreground">
                    Become a donor, volunteer, or recipient and help us end hunger together.
                </p>
            </div>
            <RegisterForm />
        </div>
    );
}
