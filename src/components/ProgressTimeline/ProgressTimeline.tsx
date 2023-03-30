/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockClosedIcon } from "@heroicons/react/20/solid";
import React from "react";
import ProgressIcon1 from "@/assets/game/progressIcon1.png";
import ProgressIcon2 from "@/assets/game/progressIcon2.png";

const steps = [
  { name: "Step 1", href: "#", status: "complete", icon: ProgressIcon1 },
  { name: "Step 2", href: "#", status: "current", icon: ProgressIcon2 },
  { name: "Step 3", href: "#", status: "upcoming" },
  { name: "Step 4", href: "#", status: "upcoming" },
  { name: "Step 5", href: "#", status: "upcoming" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProgressTimeline = () => {
  return (
    <div className="flex flex-col items-center mx-4 mt-4">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative"
              )}
            >
              {step.status === "complete" || step.status === "current" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-[#7C7278]" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-indigo-900 border-2 border-[#312E3E]">
                    <img
                      className="h-7 w-7 rounded-full bg-white"
                      style={
                        step.status === "complete"
                          ? {
                              WebkitFilter: "grayscale(100%)",
                              filter: "grayscale(100%)",
                            }
                          : {}
                      }
                      src={step.icon}
                      alt=""
                    />

                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-[#7C7278]" />
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#312E3E] bg-white hover:border-gray-400">
                    <LockClosedIcon
                      className="h-5 w-5 text-[#312E3E]"
                      aria-hidden="true"
                    />
                    {/* <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    /> */}
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressTimeline;
