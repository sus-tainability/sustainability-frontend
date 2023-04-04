import React from "react";
import ReactGA from "react-ga";

const InfoTile = ({
  imageUrl,
  link,
  text,
}: {
  imageUrl: string;
  link?: string;
  text: string;
}) => {
  const onClick = () => {
    ReactGA.event({
      category: "User",
      action: "Clicked Info Tile",
      label: text,
    });
  };

  return (
    <div className="relative h-36 w-36 rounded-lg mr-2">
      {link && (
        <a href={link}>
          <img
            onClick={onClick}
            className="object-cover h-36 w-36 rounded-lg"
            src={imageUrl}
            alt=""
          />
        </a>
      )}
      {!link && (
        <img
          className="object-cover h-36 w-36 rounded-lg"
          src={imageUrl}
          onClick={onClick}
          alt=""
        />
      )}
      <div className="bg-[#ffffffcd] absolute bottom-0 z-30 py-2 rounded-lg font-body font-bold w-full">
        <p className="text-center w-full">{text}</p>
      </div>
    </div>
  );
};

export default InfoTile;
