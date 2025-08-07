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
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userID } from "../../../components/atoms/userID";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
};

export default function LogIn() {
  const [user, setUser] = useAtom(userID);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      setUser(response.data.id);
      console.log(response.data.id);
      navigate("/");
      toast("User successfully logged in!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          In order to use the editing and rating capabilities of TMDB, as well
          as get personal recommendations you will need to login to your
          account. If you do not have an account, registering for an account
          <br />
          is free and simple.{" "}
          <Link to={"/register"} className="text-blue-400">
            Click here
          </Link>{" "}
          to get started.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
          <div>
            <h3>Password</h3>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => <Input type="password" {...field} />}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="gap-2 pt-4">
          <Button
            type="submit"
            variant="outline"
            className="auth-btn font-bold"
            id="sign-up">
            Sign In
          </Button>
          <Button
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
