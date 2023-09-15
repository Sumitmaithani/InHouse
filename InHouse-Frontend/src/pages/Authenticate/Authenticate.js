import React, {useState} from 'react'
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';

const steps = {
    1: StepPhoneEmail,
    2: StepOtp
  }

const Authenticate = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
  
    function onNext(){
      setStep(step + 1);
    }
  return (
    <div>
    <Step onClick={onNext} />
  </div>
  )
}

export default Authenticate