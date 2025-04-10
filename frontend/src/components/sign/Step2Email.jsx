import React from "react";
import UserEmailVerification from "./UserEmailVerification";
import DesignerEmailVerification from "./DesignerEmailVerification";
import ShopEmailVerification from "./ShopEmailVerification";

const Step2Email = ({ email, userType, onVerificationComplete }) => {
  const renderVerificationComponent = () => {
    switch (userType) {
      case "USER":
        return (
          <UserEmailVerification
            email={email}
            onVerificationComplete={onVerificationComplete}
          />
        );
      case "DESIGNER":
        return (
          <DesignerEmailVerification
            email={email}
            onVerificationComplete={onVerificationComplete}
          />
        );
      case "SHOP":
        return (
          <ShopEmailVerification
            email={email}
            onVerificationComplete={onVerificationComplete}
          />
        );
      default:
        return (
          <UserEmailVerification
            email={email}
            onVerificationComplete={onVerificationComplete}
          />
        );
    }
  };

  return renderVerificationComponent();
};

export default Step2Email;
