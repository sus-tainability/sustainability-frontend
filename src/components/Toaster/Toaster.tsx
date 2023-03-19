import React, { Fragment, useEffect } from "react";
import usePrevious from "@/utils/hooks/usePrevious";
import { useRecoilState } from "recoil";

import { toasterAtom, ToasterType } from "@/utils/atoms/toaster";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Toaster() {
  const [toasterState, setToasterState] = useRecoilState(toasterAtom);
  const prevToasterShown = usePrevious(toasterState.isShown);
  const prevToasterMessage = usePrevious(toasterState.message);

  let clearNotification: NodeJS.Timeout | undefined;
  useEffect(() => {
    console.log("here");
    if (prevToasterMessage !== toasterState.message && prevToasterShown) {
      clearTimeout(clearNotification);
    }
    if (toasterState.isShown && !prevToasterShown) {
      clearNotification = setTimeout(() => {
        setToasterState((prev) => ({ ...prev, isShown: false }));
      }, 4000);
    }
  }, [
    toasterState.isShown,
    setToasterState,
    prevToasterShown,
    prevToasterMessage,
    clearNotification,
  ]);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={toasterState.isShown}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {toasterState.type === ToasterType.INFO && (
                      <InformationCircleIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    )}
                    {toasterState.type === ToasterType.SUCCESS && (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                    {toasterState.type === ToasterType.ERROR && (
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {toasterState.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {toasterState.message}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() =>
                        setToasterState((prev) => ({ ...prev, isShown: false }))
                      }
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
