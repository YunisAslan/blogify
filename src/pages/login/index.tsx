import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/auth";
import { z } from "zod";
import { createNewUser, getAllUsers } from "@/services/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, UserState } from "@/redux/slices/userSlice";

export type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const userID = useSelector((state: UserState) => state.user?.id);
  console.log(userID);

  useEffect(() => {
    async function loadData() {
      const allUsers = await getAllUsers();

      setUsers(allUsers);
    }

    loadData();
  }, [setUsers]);

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
    const loginUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    let isAuth = false;

    users.forEach((user) => {
      if (
        user.username === loginUser.username &&
        user.email === loginUser.email &&
        user.password === loginUser.password
      ) {
        isAuth = true;

        dispatch(loggedIn({ id: user.id }));
      }
    });

    publishers.forEach((publisher) => {
      if (
        publisher.username === loginUser.username &&
        publisher.email === loginUser.email &&
        publisher.password === loginUser.password
      ) {
        isAuth = true;
      }
    });

    if (isAuth) {
      navigate("/news");

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
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto lg:py-0 mt-3">
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

              <Button type="submit" className="w-full">
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
  );
}

export default Login;
