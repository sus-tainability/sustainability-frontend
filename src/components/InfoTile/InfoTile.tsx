import React from "react";

const InfoTile = ({
  imageUrl,
  link,
  text,
}: {
  imageUrl: string;
  link: string;
  text: string;
}) => {
  return (
    <div className="relative h-36 w-36 rounded-lg mr-2">
      <a className="h-36 w-36" href={link}>
        <img
          className="object-cover h-36 w-36 rounded-lg"
          src={imageUrl}
          alt=""
        />
        <div className="bg-[#ffffffcd] absolute bottom-0 z-30 py-2 rounded-lg font-body font-bold w-full">
          <p className="text-center w-full">{text}</p>
        </div>
      </a>
    </div>
  );
};

export default InfoTile;
