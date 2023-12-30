import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import {
  createNewSubscription,
  deleteSubscription,
  getAllSubscriptions,
} from "@/services/api/subscribe";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SubscribeToPublisherProps {
  currentPublisher: Publisher | null;
}

function SubscribeToPublisher({ currentPublisher }: SubscribeToPublisherProps) {
  const user = useSelector((state: RootState) => state.user.user);

  const { toast } = useToast();
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const allSubscriptions = await getAllSubscriptions();
        setSubscriptions(allSubscriptions.data);

        const userId = user?.id;
        const publisherId = currentPublisher?._id;

        const find = subscriptions.find(
          (item) => item.publisherId === publisherId && item.userId === userId
        );

        if (find) {
          setIsSubscribe(true);
        } else {
          setIsSubscribe(false);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [setSubscriptions]);

  const handleSubscribe = async () => {
    const userId = user?.id;
    const publisherId = currentPublisher?._id;

    try {
      if (userId && publisherId) {
        const newSubscription: Subscription = {
          publisherId,
          userId,
        };

        const findSubscribed = subscriptions.find(
          (item) => item.publisherId === publisherId && item.userId === userId
        );

        if (findSubscribed) {
          if (findSubscribed._id) {
            await deleteSubscription(findSubscribed._id);
            setIsSubscribe(false);
          }
          return;
        } else {
          await createNewSubscription(newSubscription);
          setIsSubscribe(true);
        }
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="w-full bg-white text-black py-1 text-lg text-center uppercase tracking-wide font-oswald block border border-black hover:bg-black hover:text-white transition-all duration-500"
    >
      {isSubscribe ? "Unsubscribe" : "Subscribe"}
    </button>
  );
}

export default SubscribeToPublisher;
