import React from "react";

const InfoTile = ({ imageUrl, link }: { imageUrl: string; link: string }) => {
  return (
    <div className="h-36 w-36 rounded-lg mr-2">
      <a href={link}>
        <img className="h-36 w-36 rounded-lg" src={imageUrl} alt="" />
      </a>
    </div>
  );
};

export default InfoTile;
