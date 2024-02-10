'use client'
import { createContext, useContext, useState } from "react";
  
  const FormContext = createContext({
    formData: {},
    onHandleBack: () => {},
    onHandleNext: () => {},
    setFormData: () => {},
    step: 0,
  });
  
  function FormProvider({ children }) {
    const [formData, setFormData] = useState({});
    const [step, setStep] = useState(0);
  
    function onHandleNext() {
      setStep((prev) => prev + 1);
    }
  
    function onHandleBack() {
      setStep((prev) => prev - 1);
    }
  
    return (
      <FormContext.Provider
        value={{ formData, setFormData, onHandleBack, onHandleNext, step }}
      >
        {children}
      </FormContext.Provider>
    );
  }
  
  function useFormState() {
    return useContext(FormContext);
  }
  
  export { FormProvider, useFormState };
  