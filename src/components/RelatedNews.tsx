import { getPublisherAllNews } from "@/services/api/news";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RelatedNewsProps {
  publisherId: string;
  currentNews?: News;
}

function RelatedNews({ publisherId, currentNews }: RelatedNewsProps) {
  const [publisherAllNews, setPublisherAllNews] = useState<News[]>([]);

  useEffect(() => {
    async function loadData() {
      const pAllNews = await getPublisherAllNews(publisherId);
      setPublisherAllNews(pAllNews.data.slice(0, 2));
    }

    loadData();
  }, [publisherId, setPublisherAllNews]);

  return (
    <div className="flex flex-col gap-y-3">
      {publisherAllNews.length > 0 ? (
        publisherAllNews.map((item) => {
          return (
            item._id !== currentNews?._id && (
              <Link key={item._id} to={`/news/${item._id}`} className="group">
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={item.thumbnailImg}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all ease-easeInOutQuart duration-300 group-hover:scale-125"
                  />
                </div>

                <h2 className="font-oswald text-2xl py-2">{item.title}</h2>
                <p className="text-lg leading-tight line-clamp-6">
                  {item.description}
                </p>
              </Link>
            )
          );
        })
      ) : (
        <span className="text-muted-foreground text-center text-lg italic">No news found</span>
      )}
    </div>
  );
}

export default RelatedNews;
