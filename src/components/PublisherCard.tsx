import React from "react";
import elephant from "@/assets/images/elephant.jpeg";

interface PublisherCardProps {
  publisher: Publisher;
}

function PublisherCard({ publisher }: PublisherCardProps) {
  return (
    <div className="px-4">
      
      <div className="w-full h-80">
        <img src={publisher.profileImg} alt={publisher.name} className="w-full h-full object-cover" />
      </div>

      <div className="">
        <h2 className="text-xl my-3 uppercase font-oswald">{publisher.username}</h2>

        <p className="text-lg font-roboto line-clamp-3">
          {publisher.description}
        </p>
      </div>
    </div>
  );
}

export default PublisherCard;
