import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );
      console.log(response.data);
      navigate("/login");
      toast("User successfully registered!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Signing up for an account is free and easy. Fill out the form below to
          get started.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <h3>Username</h3>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <h3>Password (4 characters minimum)</h3>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              }}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <h3>Password Confirm</h3>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <h3>Email</h3>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => <Input type="email" {...field} />}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-2 pt-4">
          <Button
            type="submit"
            variant="outline"
            className="auth-btn font-bold"
            id="sign-up">
            Sign Up
          </Button>
          <Button
            onClick={() => toast("User successfully registered!")}
            type="button"
            variant="outline"
            className="cancel border-none shadow-none">
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
