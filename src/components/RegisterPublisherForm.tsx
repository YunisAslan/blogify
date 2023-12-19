import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPublisherSchema } from "@/validations/auth";
import { z } from "zod";
import { createNewPublisher, getAllPublishers } from "@/services/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export type RegisterPublisherFormData = z.infer<typeof registerPublisherSchema>;

function RegisterPublisherForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    async function loadData() {
      const allPublishers = await getAllPublishers();

      setPublishers(allPublishers);
    }

    loadData();
  }, [setPublishers]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterPublisherFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      backgroundImg: "",
      profileImg: "",
      description: "",
      name: "",
    },
    resolver: zodResolver(registerPublisherSchema),
  });

  const onSubmit = async (data: RegisterPublisherFormData) => {
    const newPublisher = {
      username: data.username,
      email: data.email,
      password: data.password,
      backgroundImg: data.backgroundImg,
      profileImg: data.profileImg,
      description: data.description,
      name: data.name,
      joinedDate: String(new Date()),
    };

    const availableUsername = publishers.find(
      (publisher) => publisher.username === data.username
    );
    const availableEmail = publishers.find(
      (publisher) => publisher.email === data.email
    );

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
        description: "Please try another username.",
        variant: "destructive",
      });

      return;
    }

    try {
      const createdPublisher = await createNewPublisher(newPublisher);

      if (createdPublisher) {
        navigate("/login");

        toast({
          title: "Successfully registered!",
          description: "You can login with your new account.",
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
      email: "",
      password: "",
      backgroundImg: "",
      profileImg: "",
      description: "",
      name: "",
    });
  };
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center px-2 md:px-6 py-8 mx-auto lg:py-0 mt-3">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4">
            <h1 className="text-xl font-bold md:text-2xl">
              Create your publisher account
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

              <div>
                <Label htmlFor="profileImg" className="mb-2 block">
                  Profile img
                </Label>

                <Input
                  type="url"
                  id="profileImg"
                  placeholder="https://acme.png"
                  {...register("profileImg")}
                />

                {errors.profileImg && (
                  <p className="text-red-500">{errors.profileImg?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="backgroundImg" className="mb-2 block">
                  Background img
                </Label>

                <Input
                  type="url"
                  id="backgroundImg"
                  placeholder="https://acme.png"
                  {...register("backgroundImg")}
                />

                {errors.backgroundImg && (
                  <p className="text-red-500">
                    {errors.backgroundImg?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Name
                </Label>

                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  {...register("name")}
                />

                {errors.name && (
                  <p className="text-red-500">{errors.name?.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>

                <Input
                  type="text"
                  id="description"
                  placeholder="Description"
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-red-500">{errors.description?.message}</p>
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
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPublisherForm;
