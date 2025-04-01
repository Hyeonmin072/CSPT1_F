/* eslint-disable */
import React from "react";
import Step2EmailUser from "./Step2EmailUser";
import Step2EmailDesigner from "./Step2EmailDesigner";
import Step2EmailShop from "./Step2EmailShop";

const Step2Email = ({
  formData,
  handleChange,
  errors,
  checkEmailDuplicate,
  nextStep,
  prevStep,
  userType,
  emailVerified,
  setEmailVerified,
}) => {
  const renderEmailStep = () => {
    switch (userType) {
      case "customer":
        return (
          <Step2EmailUser
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            checkEmailDuplicate={checkEmailDuplicate}
            nextStep={nextStep}
            prevStep={prevStep}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />
        );
      case "designer":
        return (
          <Step2EmailDesigner
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            checkEmailDuplicate={checkEmailDuplicate}
            nextStep={nextStep}
            prevStep={prevStep}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />
        );
      case "owner":
        return (
          <Step2EmailShop
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            checkEmailDuplicate={checkEmailDuplicate}
            nextStep={nextStep}
            prevStep={prevStep}
            emailVerified={emailVerified}
            setEmailVerified={setEmailVerified}
          />
        );
      default:
        return null;
    }
  };

  return renderEmailStep();
};

export default Step2Email;
