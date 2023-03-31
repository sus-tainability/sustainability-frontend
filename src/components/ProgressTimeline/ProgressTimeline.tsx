/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/24/outline";
import React from "react";

export type Step = {
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
  icon?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProgressTimeline = ({ steps }: { steps: Step[] }) => {
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
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#312E3E] bg-white hover:border-gray-400">
                    {step.status === "complete" && (
                      <CheckCircleIcon className="h-5 w-5 text-[#312E3E]" />
                    )}
                    {step.status === "current" && (
                      <CheckCircleIconOutline className="h-5 w-5 text-[#312E3E]" />
                    )}
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
