'use client'

import GetEmail from "@/app/components/(auth)/getEmail"
import VerifyOTP from "@/app/components/(auth)/verifyOtp"
import OtpVerified from "@/app/components/(auth)/otpVerified"
import WelcomePage from "@/app/components/(auth)/welcomePage"
import SuccessPage from "@/app/components/(auth)/successPage"
import GetCredentials from "@/app/components/(auth)/getCredentials"
import UploadPic from "@/app/components/(auth)/uploadPic"


import { useFormState } from "@/app/utility/FormContext"

function ActiveStepFormComponent() {
    const { step } = useFormState();
    switch (step) {
      case 0:
        return <WelcomePage/>;
      case 1:
        return <GetCredentials/>;
      case 2:
        return <GetEmail />;
      case 3:
        return <VerifyOTP/>;
      case 4:
        return <OtpVerified/>;
      case 5:
        return <UploadPic />;
      case 6:
        return <SuccessPage />;
      default:
        return null;
    }
  }

export default function SignUp() {
    return (
        <div >
          <ActiveStepFormComponent />
        </div>
    );
  }