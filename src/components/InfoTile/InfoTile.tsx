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
    <div className="flex flex-col items-center gap-2 h-fit w-56 rounded-lg mr-2">
      {link && (
        <a href={link}>
          <img
            onClick={onClick}
            className="object-cover h-36 w-100 rounded-lg"
            src={imageUrl}
            alt=""
          />
        </a>
      )}
      {!link && (
        <img
          className="object-cover h-36 w-100 rounded-lg"
          src={imageUrl}
          onClick={onClick}
          alt=""
        />
      )}
      <div className="font-body font-white w-full line-clamp-2">{text}</div>
    </div>
  );
};

export default InfoTile;
