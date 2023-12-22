import { Swiper, SwiperSlide } from 'swiper/react';
import ElephantImg from "@/assets/images/elephant.jpeg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


function Photography() {
  return (
    <div className="border-b-2 border-black pb-20">
      <h1 className="py-2 mb-14 text-[4rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        Photography
      </h1>

      {/* swiper slider */}
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
        //   autoplay={{
        //     delay: 2500,
        //     disableOnInteraction: false,
        //   }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={ElephantImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Photography;
