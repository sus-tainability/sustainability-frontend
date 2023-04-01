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
    <div className="h-36 w-36 rounded-lg mr-2">
      <a className="relative" href={link}>
        <div className="bg-[#ffffffcd] py-2 rounded-lg font-body font-bold w-full">
          <p className="text-center w-full">{text}</p>
        </div>
        <img
          className="object-cover h-36 w-36 rounded-lg"
          src={imageUrl}
          alt=""
        />
      </a>
    </div>
  );
};

export default InfoTile;
