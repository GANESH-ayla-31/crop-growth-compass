
import { AuthForm } from "@/components/AuthForm";
import { Leaf } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Crop Growth Compass</h1>
          <p className="mt-2 text-muted-foreground">
            Your complete farming management solution
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
