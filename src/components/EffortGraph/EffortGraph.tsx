import React from "react";

const data = [
  {
    percentage: 70,
    label: "You",
    color: "#CAE326",
  },
  {
    percentage: 27,
    label: "21-30",
    color: "#312E3E",
  },
  {
    percentage: 40,
    label: "All",
    color: "#7C7278",
  },
];

const EffortGraph = () => {
  return (
    <div className="flex h-[80%] text-xs text-right float-right justify-end">
      {data.map((item) => {
        const dum = `relative w-full h-[${item.percentage}%] bg-[${item.color}]`;
        return (
          <div className="flex flex-col justify-end w-10">
            <div className={dum}></div>
            <p className="text-center">{item.label}</p>
          </div>
        );
      })}
      {/* <div>
        <div className="relative w-full h-[70%] bg-[#CAE326]"></div>
        <p>You</p>
      </div>
      <div>
        <div className="relative w-full h-[27%] bg-[#312E3E]"></div>
        <p>21-30</p>
      </div>
      <div>
        <div className="relative w-full h-[40%] bg-[#7C7278]"></div>
        <p>All</p>
      </div> */}
    </div>
  );
};

export default EffortGraph;
