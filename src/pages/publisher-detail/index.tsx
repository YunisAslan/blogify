import { getPublisherByID } from "@/services/api/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import RelatedNews from "@/components/RelatedNews";
import SubscribeToPublisher from "@/components/SubscribeToPublisher";
import { AxiosError } from "axios";
import { useAuth } from "@/services/context/AuthContextProvider";

function PublisherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account] = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentPublisher, setCurrentPublisher] = useState<Publisher | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        if (id) {
          const publisher = await getPublisherByID(id);

          if (publisher) {
            setCurrentPublisher(publisher.data);
          }
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 404) {
            navigate("not-found");
          }
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, setCurrentPublisher, navigate, currentPublisher?._id]);

  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!currentPublisher) {
    return <Skeleton className="h-20" />;
  }

  return (
    <>
      <div className="pb-5">
        <h1 className="uppercase font-oswald text-3xl text-center md:text-6xl lg:text-8xl my-5">
          {currentPublisher?.username}
        </h1>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-9">
            <div className="w-full h-[740px]">
              <img
                src={`${currentPublisher?.profileImg.name}`}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            <div className="mt-4 min-w-full">
              <h2 className="font-oswald text-[28px] uppercase mt-4">
                {currentPublisher.name}
              </h2>
              <p className="uppercase text-lg">Publisher</p>

              <p className="text-lg mt-5">{currentPublisher.description}</p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <div className="">
              <div className="mb-4 flex flex-col gap-y-2">
                {currentPublisher._id !== account?._id && (
                  <SubscribeToPublisher currentPublisher={currentPublisher} />
                )}

                <button className="cursor-default w-full bg-black text-white py-1 text-lg text-center uppercase tracking-wide font-oswald block border border-black">
                  NEWS
                </button>
              </div>

              {currentPublisher._id && (
                <RelatedNews publisherId={currentPublisher._id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublisherDetail;
