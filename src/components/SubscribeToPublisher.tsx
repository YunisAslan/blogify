import { useToast } from "@/hooks/use-toast";
import {
  createNewSubscription,
  deleteSubscription,
  getAllSubscriptions,
} from "@/services/api/subscribe";
import { useAuth } from "@/services/context/AuthContextProvider";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface SubscribeToPublisherProps {
  currentPublisher: Publisher | null;
}

function SubscribeToPublisher({ currentPublisher }: SubscribeToPublisherProps) {
  const [account] = useAuth();

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const allSubscriptions = await getAllSubscriptions();
        setSubscriptions(allSubscriptions.data);

        const userId = account?._id;
        const publisherId = currentPublisher?._id;

        const find = subscriptions?.find(
          (item) => item.publisherId == publisherId && item.userId == userId
        );

        // initial subscribe status
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
  }, [setSubscriptions, currentPublisher, currentPublisher?._id, isSubscribe]);

  const handleSubscribe = async () => {
    const userId = account?._id;
    const publisherId = currentPublisher?._id;

    try {
      setLoading(true);

      if (userId && publisherId) {
        const newSubscription: Subscription = {
          publisherId,
          userId,
        };

        const findSubscribed = subscriptions?.find(
          (item) => item.publisherId === publisherId && item.userId === userId
        );

        if (findSubscribed && findSubscribed._id) {
          await deleteSubscription(findSubscribed._id, { userId });
          setIsSubscribe(false);

          setSubscriptions((prevSubscriptions) =>
            prevSubscriptions.filter((sub) => sub._id !== findSubscribed._id)
          );

          return;
        } else {
          const createdSubscription = await createNewSubscription(
            newSubscription
          );
          setIsSubscribe(true);

          console.log(subscriptions);

          if (subscriptions) {
            setSubscriptions([...subscriptions, createdSubscription.data]);
          } else {
            setSubscriptions([createdSubscription.data]);
          }

          toast({
            title: `Successfully subscribed to ${currentPublisher.username}!`,
          });
        }
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
    <button
      onClick={handleSubscribe}
      className="w-full bg-white text-black flex items-center justify-center py-1 text-lg text-center uppercase tracking-wide font-oswald border border-black hover:bg-black hover:text-white transition-all duration-500"
    >
      {isSubscribe ? "Unsubscribe" : "Subscribe"}
      {loading && <Loader2Icon className="ml-2 animate-spin w-4 h-5" />}
    </button>
  );
}

export default SubscribeToPublisher;
