import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { newsPostSchema } from "@/validations/news";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createNewPost } from "@/services/api/news";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof newsPostSchema>;

function Write() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    reset,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      thumbnailImg: "",
      newsBody: "",
    },
    resolver: zodResolver(newsPostSchema),
  });

  const onSubmit = async (data: FormData) => {
    const newPost = {
      title: data.title,
      thumbnailImg: data.thumbnailImg,
      linkURL: "acme",
      newsBody: data.newsBody,
      createdAt: String(new Date()),
    };

    try {
      setLoading(true);

      const createdPost = await createNewPost(newPost);

      if (createdPost) {
        toast({
          title: "Successfully created!",
        });

        reset({
          title: "",
          thumbnailImg: "",
          newsBody: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Write
      </h1>

      <div className="w-full md:w-3/4 mx-auto">
        <section className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Article</CardTitle>
              <CardDescription>
                Fill out the form below to create a new article post.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Acme" {...register("title")} />

                  {errors.title && (
                    <span className="text-sm text-destructive">
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input
                    id="thumbnail"
                    placeholder="https://thumbnail.png"
                    {...register("thumbnailImg")}
                  />

                  {errors.thumbnailImg && (
                    <span className="text-sm text-destructive">
                      {errors.thumbnailImg.message}
                    </span>
                  )}
                </div>

                <div className="relative pb-3">
                  <MarkdownEditor
                    height="100px"
                    value={getValues("newsBody")}
                    onChange={(value) => setValue("newsBody", value)}
                  />
                  {errors.newsBody && (
                    <span className="absolute pt-1 text-sm text-destructive">
                      {errors.newsBody.message}
                    </span>
                  )}
                </div>

                <div>
                  <Button type="submit" isLoading={loading} size="sm">
                    Save
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="prose">
        {/* <Markdown>{getValues("newsBody")}</Markdown> */}
      </div>
    </div>
  );
}

export default Write;
