import { createContext, useContext, useState } from "react";

const calculatorContext = createContext();

export const CalculatorProvider = ({children}) => {

  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");

  return (
    <calculatorContext.Provider 
    value={{currentValue, setCurrentValue, previousValue, 
    setPreviousValue, operator, setOperator}}>
      {children}
    </calculatorContext.Provider>
  );
}

export const useCalculatorContext = () => useContext(calculatorContext);