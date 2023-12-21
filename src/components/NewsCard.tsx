import moment from "moment";

interface NewsCardProps {
  item: News;
}

function NewsCard({ item }: NewsCardProps) {
  
  
  return (
    <div className="px-4">
      <div>
        <img src={item.thumbnailImg} alt="" className="w-full h-full" />
      </div>

      

      <div className="font-oswald">

        <h2 className="text-3xl mt-2">{item.title}</h2>
        <p className="uppercase text-base">
          {moment(item.createdAt).format("LL")}
        </p>

        <p className="pt-2 font-roboto">
          Nam imperdiet nisl eros, nec tristique nisi gravida id. Nulla
          tincidunt nec arcu ut semper. Maecenas sed lacus justo. Donec ut sem
          et ligula ullamcorper venenatis ac tincidunt mi.
        </p>
      </div>
    </div>
  );
}

export default NewsCard;
