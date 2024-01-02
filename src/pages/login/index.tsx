import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth";
import { z } from "zod";
import {
  getPublisherByID,
  getUserByID,
  loginWithPublisherAccount,
  loginWithUserAccount,
} from "@/services/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/services/context/AuthContextProvider";

export type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [_, setAccount] = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

      const userAccount = await loginWithUserAccount(loginAccount);
      const publisherAccount = await loginWithPublisherAccount(loginAccount);

      if (userAccount && userAccount.success && userAccount.token) {
        isAuth = true;

        await Cookies.set("token", userAccount?.token, {
          expires: 1,
          secure: true,
        });
        const decoded = jwtDecode<JwtPayload>(userAccount.token);

        const currentUser = await getUserByID(decoded.id);
        setAccount(currentUser?.data);
      }

      if (
        publisherAccount &&
        publisherAccount.success &&
        publisherAccount.token
      ) {
        isAuth = true;

        await Cookies.set("token", publisherAccount?.token, {
          expires: 1,
          secure: true,
        });
        const decoded = jwtDecode<JwtPayload>(publisherAccount.token);

        const currentPublisher = await getPublisherByID(decoded.id);
        setAccount(currentPublisher?.data);
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
        title:
          "Your username or email or password incorrect or unverified account!",
        description: "Please try again.",
        variant: "destructive",
      });
    }
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
