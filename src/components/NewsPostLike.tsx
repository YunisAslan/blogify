import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { likeNewsPost } from "@/services/api/news";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, buttonVariants } from "./ui/Button";

interface NewsPostLikeProps {
  item: News;
}

function NewsPostLike({ item }: NewsPostLikeProps) {
  const { toast, dismiss } = useToast();
  const user = useSelector((state: RootState) => state.user.user);

  const [likesCount, setLikesCount] = useState(item.likes.length);
  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    setLikes([...item.likes]);
  }, [setLikes]);

  const handleLike = async () => {
    if (item._id && user?.id) {
      try {
        const res = await likeNewsPost(item._id, user.id);

        if (res.value === "like") {
          setLikesCount((prev) => prev + 1);
          setLikes([...res.data.likes]);
        }

        if (res.value === "disslike") {
          setLikesCount((prev) => prev - 1);
          setLikes([...res.data.likes]);
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } else {
      return toast({
        title: "You must be login to like!",
        action: (
          <a
            onClick={() => dismiss()}
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            Login
          </a>
        ),
      });
    }
  };

  const isLikedForCurrentUser = likes.some((val) => val == user?.id);

  return (
    <div className="flex items-center gap-x-2 justify-end mt-2">
      <span>{likesCount}</span>
      <Button variant="ghost" size="icon" onClick={handleLike}>
        <ThumbsUp
          className={cn("w-5 h-5", isLikedForCurrentUser && "fill-black")}
        />
      </Button>
    </div>
  );
}

export default NewsPostLike;
