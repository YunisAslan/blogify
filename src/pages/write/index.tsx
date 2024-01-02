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
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import { ActionMeta } from "react-select";
import { createNewTag, getAllTags } from "@/services/api/tag";
import { useAuth } from "@/services/context/AuthContextProvider";

type FormData = z.infer<typeof newsPostSchema>;
interface SelectOption {
  value: string | undefined;
  label: string;
}

function Write() {
  const [account] = useAuth();

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<SelectOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function loadData() {
      const tags = await getAllTags();

      const tagOptions = tags.data.flatMap((tag) => ({
        value: tag._id,
        label: tag.name,
      }));

      setAllTags(tagOptions);
    }

    loadData();
  }, [setAllTags]);

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
      description: "",
      tags: [],
      newsBody: "",
    },
    resolver: zodResolver(newsPostSchema),
  });

  const handleTagChange = async (
    options: readonly SelectOption[],
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (actionMeta.action === "select-option") {
      setSelectedTags([
        ...selectedTags,
        {
          value: actionMeta.option?.value as string,
          label: actionMeta.option?.label as string,
        },
      ]);
    } else if (actionMeta.action === "remove-value") {
      const updatedTags = [...selectedTags].filter(
        (item) => item.label !== actionMeta.removedValue.label
      );
      setSelectedTags([...updatedTags]);
    } else if (actionMeta.action === "create-option") {
      const newTag = { name: actionMeta.option.label };

      const res = await createNewTag(newTag);
      if (res.data._id) {
        setSelectedTags([
          ...selectedTags,
          {
            value: res.data._id,
            label: actionMeta.option?.label as string,
          },
        ]);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    const newPost: News = {
      title: data.title,
      thumbnailImg: data.thumbnailImg,
      linkURL: "acme",
      newsBody: data.newsBody,
      publisherId: account?._id as string,
      tags: selectedTags.map((item) => item.value as string),
      likes: [],
      description: data.description,
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
          tags: [],
          description: "",
          newsBody: "",
        });
        setSelectedTags([]);
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
                  <Input
                    type="text"
                    id="title"
                    placeholder="Acme"
                    {...register("title")}
                  />

                  {errors.title && (
                    <span className="text-sm text-destructive">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input
                    type="url"
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

                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    placeholder="Lorem ipsum dolor sit amet"
                    {...register("description")}
                  />

                  {errors.description && (
                    <span className="text-sm text-destructive">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="description">Tags</Label>
                  <CreatableSelect
                    isMulti
                    options={allTags}
                    value={selectedTags}
                    onChange={(options, actionMeta) =>
                      handleTagChange(options, actionMeta)
                    }
                  />
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
    </div>
  );
}

export default Write;
