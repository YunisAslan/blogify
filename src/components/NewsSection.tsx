import { getAllNews } from "@/services/api/news";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function NewsSection() {
  const [slicedNews, setSlicedNews] = useState<News[]>([]);

  useEffect(() => {
    async function loadData() {
      const news = await getAllNews();
      setSlicedNews(news.data.slice(0, 4));
    }

    loadData();
  }, [setSlicedNews]);

  return (
    <div className="border-b-2 border-black pb-20">
      <h1 className="py-2 mb-14 text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        News
      </h1>

      <div className="grid grid-cols-4 divide-x divide-x-accent">
        {slicedNews.map((item) => {
          return <NewsCard item={item} key={item._id} />;
        })}
      </div>
    </div>
  );
}

export default NewsSection;
