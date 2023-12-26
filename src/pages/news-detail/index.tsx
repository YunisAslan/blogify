import NotFound from "@/components/NotFound";
import { getNewsByID } from "@/services/api/news";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReadingTime } from "react-hook-reading-time";

function NewsDetail() {
  const { id } = useParams();
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const news = await getNewsByID(id);
        setCurrentNews(news.data);
      }
    }

    loadData();
  }, [id, setCurrentNews]);

  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!currentNews) {
    return <NotFound />;
  }

  return (
    <div className="py-20">
      <h1 className="font-oswald text-3xl md:text-6xl lg:text-8xl my-3">
        {currentNews?.title}
      </h1>

      <p className="text-2xl block mb-6">
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <div className="w-full h-[740px]">
            <img
              src={`${currentNews?.thumbnailImg}`}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>

          <p className="text-lg tracking-wide uppercase border-b border-b-black mt-2">
            {moment(new Date(currentNews?.createdAt as string)).format("LL")} -{" "}
            <span>{useReadingTime(currentNews.newsBody).minutes} MIN</span>
          </p>

          <div> {currentNews.newsBody}</div>
        </div>

        <div className="col-span-3 bg-blue-400">RIGHT SIDE</div>
      </div>
    </div>
  );
}

export default NewsDetail;
