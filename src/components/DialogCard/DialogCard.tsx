import { dialogAtom } from "@/utils/atoms/dialog";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";

import creditsIcon from "@/assets/game/creditsIcon.svg";
import peopleIcon from "@/assets/game/peopleIcon.svg";
import infoIcon from "@/assets/game/infoIcon.svg";

const DialogCard = () => {
  const [dialogState, setDialogState] = useRecoilState(dialogAtom);

  const icons = [infoIcon, peopleIcon, creditsIcon];

  const setClose = () => {
    setDialogState((prev) => ({ ...prev, isShown: false }));
  };

  return (
    <Transition.Root show={dialogState.isShown} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setClose}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 backdrop-brightness-50 backdrop-blur-sm">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white bg-opacity-80  p-7 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 self-center">
                <div className="absolute right-0 top-0 pr-4 pt-7 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    onClick={setClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="flex h-fit flex-shrink-0 items-start justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <Dialog.Title
                      as="h3"
                      className="text-left text-2xl w-full font-semibold"
                    >
                      {dialogState.title}
                    </Dialog.Title>
                  </div>
                  <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <p className="text-md text-gray-600">
                        {dialogState.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  {icons.map((icon, i) => (
                    <div key={i} className="flex mt-2 items-center">
                      <img src={icon} alt="info" />
                      <p className="ml-4">{dialogState.footer[i]}</p>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DialogCard;
