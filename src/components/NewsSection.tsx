import { getAllNews } from "@/services/api/news";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function NewsSection() {
  const [news, setNews] = useState<News[]>();

  useEffect(() => {
    async function loadData() {
      try {
        const newsData = await getAllNews();
        setNews(newsData.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, []);

  return (
    <div>
      <h1 className="py-2 mb-14 text-[5rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        News
      </h1>

      <div className="grid grid-cols-4 divide-x divide-x-accent">
        {news?.map((item) => {
          return <NewsCard item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default NewsSection;
