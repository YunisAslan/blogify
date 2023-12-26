import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth";
import { z } from "zod";
import {
  loginWithPublisherAccount,
  loginWithUserAccount,
} from "@/services/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "@/redux/slices/userSlice";
import { Helmet } from "react-helmet";

export type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const loginAccount = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    let isAuth = false;

    try {
      setLoading(true);

      const user = await loginWithUserAccount(loginAccount);
      const publisher = await loginWithPublisherAccount(loginAccount);

      if (user.success) {
        isAuth = true;

        dispatch(loggedIn({ id: user.data._id, type: "user" }));
      }

      if (publisher.success) {
        isAuth = true;

        dispatch(loggedIn({ id: publisher.data._id, type: "publisher" }));
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

    if (isAuth) {
      navigate("/");

      toast({
        title: "Successfully logged in!",
      });
    } else {
      toast({
        title: "Your username or email or password incorrect!",
        description: "Please try again.",
        variant: "destructive",
      });
    }

    // reset({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };
  return (
    <>
      <Helmet>
        <title>Blogify | Sign in</title>
      </Helmet>

      <div className="w-full">
        <div className="min-h-screen flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto lg:py-0 mt-3">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div className="space-y-4">
              <h1 className="text-xl font-bold md:text-2xl">
                Login with your account
              </h1>

              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label htmlFor="username" className="mb-2 block">
                    Username
                  </Label>

                  <Input
                    type="text"
                    id="username"
                    placeholder="Acme"
                    {...register("username")}
                  />

                  {errors.username && (
                    <p className="text-red-500">{errors.username?.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email
                  </Label>

                  <Input
                    type="text"
                    id="email"
                    placeholder="example@gmail.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="mb-2 block">
                    Password
                  </Label>

                  <Input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("password")}
                  />

                  {errors.password && (
                    <p className="text-red-500">{errors.password?.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" isLoading={loading}>
                  Sign in
                </Button>

                <p className="text-sm font-light text-muted-foreground">
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-gray-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
