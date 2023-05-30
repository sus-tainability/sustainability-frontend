import { useState } from "react";
import { useIonRouter } from "@ionic/react";

import AppButton from "@/components/AppButton";
import img1 from "../../assets/onboarding/1.png";
import img2 from "../../assets/onboarding/2.png";
import img3 from "../../assets/onboarding/3.png";
import img4 from "../../assets/onboarding/4.png";
import img5 from "../../assets/onboarding/5.png";
import img6 from "../../assets/onboarding/6.png";
import img7 from "../../assets/onboarding/7.png";

const Onboarding = () => {
  const router = useIonRouter();

  const steps = [
    "Let's get you started \n on your recyling journey!",
    "The status bar shows you \n which stage the quest is at",
    "Here you can find the  \n instructions to the current \n challenge",
    "You may view your progress \n and efforts here!",
    "Whenever you’re ready, you \n may submit a contribution \n here!",
    "Every time your \n contribution is validated, it \n will add to this progress bar. \n Upon completion, the vote \n for the next challenge will \n begin!",
    "Your adventure now begins, \n don’t forget to invite your \n friends!",
  ];
  const images = [img1, img2, img3, img4, img5, img6, img7];

  const height = [300, 130, 550, 550, 690, 350, 670];

  const [currentStep, setCurrentStep] = useState(0);

  const getNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === steps.length - 1) {
      localStorage.setItem("showOnboarding", "false");
      const nextId = localStorage.getItem("nextId") || 2;
      router.push("/story/game/" + nextId);
    }
  };

  return (
    <div className="w-full h-screen overflow-auto relative">
      <img src={images[currentStep]} className="w-full" alt="onboarding" />
      <div
        style={{
          top: `${height[currentStep]}px`,
        }}
        className={`w-full absolute`}
      >
        <p
          style={{
            whiteSpace: "pre-line",
          }}
          className="font-header text-white text-2xl font-semibold text-center"
        >
          {steps[currentStep]}
        </p>
        <div className="flex w-full justify-center mt-3">
          <AppButton onClick={getNextStep} className="px-6 py-3">
            Continue
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
