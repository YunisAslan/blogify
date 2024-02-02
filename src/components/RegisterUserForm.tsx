import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "@/validations/auth";
import { z } from "zod";
import { createNewUser, getAllUsers } from "@/services/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export type RegisterUserFormData = z.infer<typeof registerUserSchema>;

function RegisterUserForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadData() {
      const allUsers = await getAllUsers();

      setUsers(allUsers.data);
    }

    loadData();
  }, [setUsers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterUserFormData>({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      profileImg: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserFormData) => {

    const newUser = {
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      profileImg: data.profileImg,
      isAdmin: false,
      isVerified: false,
      type: "user"
    };

    const availableUsername = users?.find(
      (user) => user.username === data.username
    );

    
    const availableEmail = users?.find((user) => user.email === data.email);

    // if username and email exists
    if (availableUsername && availableEmail) {
      toast({
        title: "Username and email already exists!",
        description: "Please try anothers.",
        variant: "destructive",
      });

      return;
    }
    // if username exists
    if (availableUsername) {
      toast({
        title: "Username already exists!",
        description: "Please try another username.",
        variant: "destructive",
      });

      return;
    }
    // if email exists
    if (availableEmail) {
      toast({
        title: "Email already exists!",
        description: "Please try another email.",
        variant: "destructive",
      });

      return;
    }

    try {
      const createdUser = await createNewUser(newUser);

      if (createdUser) {
        navigate("/login");

        toast({
          title: "Successfully registered!",
          description: "Check your email(& spam) to verify your account.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    reset({
      username: "",
      fullName: "",
      email: "",
      password: "",
      profileImg: "",
    });
  };
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto lg:py-0 mt-3">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4">
            <h1 className="text-xl font-bold md:text-2xl">
              Create your user account
            </h1>

            <form
              className="space-y-3"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              encType="multipart/form-data"
             >
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
                <Label htmlFor="fullName" className="mb-2 block">
                  Full name
                </Label>

                <Input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  {...register("fullName")}
                />

                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName?.message}</p>
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

              <div>
                <Label htmlFor="profileImg" className="mb-2 block">
                  Profile img
                </Label>

                <Input
                  type="text"
                  id="profileImg"
                  placeholder="https://acme.png"
                  {...register("profileImg")}
                />
              
                {errors.profileImg && (
                  <p className="text-red-500">
                    {errors?.profileImg?.message as string}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Sign up
              </Button>

              <p className="text-sm font-light text-muted-foreground">
                Have an account ?{" "}
                <Link
                  to="/login"
                  className="font-medium text-gray-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUserForm;
