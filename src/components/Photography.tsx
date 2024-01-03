import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNews } from "@/services/api/news";

function Photography() {
  const [slicedNews, setSlicedNews] = useState<News[]>([]);

  useEffect(() => {
    async function loadData() {
      const news = await getAllNews();
      const sortedNewsByLike = news.data.sort(
        (a, b) => b.likes.length - a.likes.length
      );
      setSlicedNews(sortedNewsByLike.slice(0, 3));
    }

    loadData();
  }, [setSlicedNews]);

  return (
    <div className="border-b-2 border-black pb-20">
      <h1 className="py-2 mb-14 text-4xl md:text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Photography
      </h1>

      {/* swiper slider */}
      <div className="w-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          parallax={true}
          modules={[Navigation]}
          loop={true}
          className="photography"
        >
          {slicedNews.length === 0 ? (
            <p className="text-center text-2xl font-bold col-span-12 text-orange-400">
              There is currently no data you are looking for
            </p>
          ) : (
            slicedNews.map((item) => {
              return (
                <SwiperSlide className="h-[700px]" key={item._id}>
                  <div
                    className="w-full h-full relative"
                    data-swiper-parallax="-100"
                  >
                    <img
                      src={item.thumbnailImg}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="bg-[#000000b5] text-white w-full md:w-[500px] px-8 pt-8 pb-4 absolute z-10 left-0 bottom-6">
                      <h3 className="text-2xl md:text-4xl font-oswald">
                        {item.title}
                      </h3>
                      <p className="pt-3 text-sm md:text-lg line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex justify-end pt-4">
                        <Link
                          to={`/news/${item._id}`}
                          className="font-oswald hover:underline"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )}

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </div>
  );
}

export default Photography;
