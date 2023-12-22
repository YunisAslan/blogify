import { Swiper, SwiperSlide } from "swiper/react";
import ElephantImg from "@/assets/images/elephant.jpeg";
import ZebraImg from "@/assets/images/zebra.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

function Photography() {
  return (
    <div className="border-b-2 border-black pb-20">
      <h1 className="py-2 mb-14 text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Photography
      </h1>

      {/* swiper slider */}
      <div className="w-full border border-red-500">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Navigation]}
          loop={true}
          className="photography"
        >
          <SwiperSlide className="h-[700px]">
            <img
              src={ElephantImg}
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="h-[700px]">
            <img src={ZebraImg} alt="" className="w-full h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="h-[700px]">
            <img
              src={ElephantImg}
              alt=""
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <div className="flex items-center bg-green-600 p-3">
            <div className="swiper-button-next"></div>
            <div className="border-r border-r-red-400"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Photography;
