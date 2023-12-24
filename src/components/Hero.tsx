import HeroImg from "@/assets/images/hero.jpg";
import QuoteSvg from "@/assets/images/quote.svg";

function Hero() {
  return (
    <div className="border-b-2 border-black">
      <h1 className="text-5xl md:text-[6.75rem] font-oswald uppercase text-center leading-[0.9] tracking-wider">
        The art magazine
      </h1>
      <p className="text-base md:text-2xl mb-8 text-center py-2">
        international art news & exhibitions journal - since 2021
      </p>

      <div>
        <img src={HeroImg} alt="" className="w-full h-full" />
      </div>

      <div className="py-16 w-[85%] md:w-3/4 flex justify-center mx-auto relative text-start">
        <div className="w-24 h-20 absolute -left-6 md:-left-14 top-6 -z-10">
          <img src={QuoteSvg} alt="" className="w-full h-full" />
        </div>

        <blockquote className="text-xl md:text-4xl font-medium">
          Hər insan iki dəfə ölür. Həyatı sona çatanda və adı sonuncu dəfə
          hallananda. Adını bilən sonuncu insan da öləndə, sən heç doğulmamış
          olacaqsan.
        </blockquote>
      </div>
    </div>
  );
}

export default Hero;
