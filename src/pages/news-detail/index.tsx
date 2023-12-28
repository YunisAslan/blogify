import NotFound from "@/components/NotFound";
import { getNewsByID } from "@/services/api/news";
import { getPublisherByID } from "@/services/api/auth";
import moment from "moment";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import RelatedNews from "@/components/RelatedNews";
import RelatedPublishers from "@/components/RelatedPublishers";
import { Button } from "@/components/ui/Button";
import { ThumbsUp } from "lucide-react";
import NewsPostLike from "@/components/NewsPostLike";

function NewsDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);
  const [currentPublisher, setCurrentPublisher] = useState<Publisher | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        if (id) {
          const news = await getNewsByID(id);
          setCurrentNews(news.data);
        }

        if (currentNews?.publisherId) {
          setLoading(true);
          const publisher = await getPublisherByID(currentNews.publisherId);
          setCurrentPublisher(publisher.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, currentNews?.publisherId, setCurrentNews, setCurrentPublisher]);

  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!currentNews) {
    return <NotFound />;
  }

  return (
    <div className="pb-5">
      <h1 className="font-oswald text-3xl md:text-6xl lg:text-8xl my-3">
        {currentNews?.title}
      </h1>

      <p className="text-2xl block mb-6">{currentNews.description}</p>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <div className="w-full h-[740px]">
            <img
              src={`${currentNews?.thumbnailImg}`}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between border-b border-b-black mt-2 pb-1">
            <div>
              <p className="text-lg tracking-wide uppercase">
                {moment(new Date(currentNews?.createdAt as string)).format(
                  "LL"
                )}{" "}
                - <span>6 MIN</span>
              </p>
            </div>

            <NewsPostLike item={currentNews} />
          </div>

          <div className="mt-8 prose min-w-full">
            <Markdown>{currentNews.newsBody}</Markdown>
          </div>
        </div>

        <div className="col-span-3">
          <div className="">
            <div className="w-full h-72">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <img
                  src={currentPublisher?.profileImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="my-4 flex flex-col gap-y-2">
              <Link
                to="/author/id"
                className="w-full bg-black text-white py-1 text-lg text-center uppercase tracking-wide font-oswald block border border-black hover:bg-white hover:text-black transition-all duration-500"
              >
                BY {currentPublisher?.username}
              </Link>

              <button className="w-full bg-white text-black py-1 text-lg text-center uppercase tracking-wide font-oswald block border border-black hover:bg-black hover:text-white transition-all duration-500">
                Subscribe
              </button>
            </div>

            <RelatedNews
              publisherId={currentNews.publisherId}
              currentNews={currentNews}
            />

            <RelatedPublishers publisherId={currentNews.publisherId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
