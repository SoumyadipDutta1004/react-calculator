import Button from "./Button"
import { LuDelete, LuEqual } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { LuX } from "react-icons/lu";
import { FiPercent } from "react-icons/fi";
import { FaDivide } from "react-icons/fa6";

import { useCalculatorContext } from "../context/CalculatorContext"

// Define button values
const btnValues = [
  "C", <LuDelete /> , <FiPercent />, <FaDivide />, 
  "7", "8", "9", <LuX />, 
  "4", "5", "6", <HiMinus />, 
  "1", "2", "3", <GoPlus />, 
  "0", ".", <LuEqual />
]
// Convert icons components to corresponding symbols 
const symbolMap = {
  FiPercent : "%",
  FaDivide : "÷",
  LuX : "x",
  HiMinus : "-",
  GoPlus : "+"
}
// Convert symbols to javascript operator for calculation
const operatorMap = {
  "%" : "%",
  "÷" : "/",
  "x" : "*",
  "-" : "-",
  "+" : "+"
}

const ButtonArea = () => {

  const {currentValue, setCurrentValue, previousValue, setPreviousValue, operator, setOperator} = useCalculatorContext();

  // Append number to the currentValue state
  const addCurrentValue = (value) => {
    if(value === "." && currentValue.includes(".")) return;
    let prevValue = currentValue === "0" ? value : currentValue + value;
    setCurrentValue(prevValue);
  }
  // Remove the last digit from currentValue state
  const deleteLastDigit = () => {
    setCurrentValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }
  // Clear the screen by resetting the states
  const clearValue = () => {
    setCurrentValue("0");
    setPreviousValue('');
    setOperator('');
  }
  
  // Add the operator in the operator state
  // And if the user is clicking a operator for the 2nd time then compute the previous 2 values
  const handleOperator = (iconName) => {

    if(previousValue && operator && currentValue !== "0"){
      let newValue = Function(`return ${previousValue} ${operatorMap[operator]} ${currentValue}`)().toString();
      setPreviousValue(newValue);
      setPreviousValue(newValue);
      setCurrentValue("0");
    }
    else if(currentValue !== "0"){
      setPreviousValue(currentValue);
      setCurrentValue("0");
    }
    setOperator(symbolMap[iconName]);
  }

  // Calculate the result and store the calculated value in the currentValue state as a current value
  const calculateResult = () => {
    if(!previousValue && !operator || currentValue === "0") return;

    let result = Function(`return ${previousValue} ${operatorMap[operator]} ${currentValue}`)().toString();
    setPreviousValue("");
    setOperator("");
    setCurrentValue(result);
  }

  // Give every button a different function according to their type:
  // - Numbers and "." → Append to current value.
  // - "C" → Clear all values and reset the calculator.
  // - Operators (+, -, ×, ÷, %) → Store the operator and handle calculations.
  // - etc...
  const handleOnClick = (value) => {
    if(!isNaN(value) || value === "."){
      addCurrentValue(value);
    }
    else if(value === "C"){
      clearValue();
    }
    else if(value.type.name === "LuDelete"){
      deleteLastDigit();
    }
    else if(value.type.name === "LuEqual"){
      calculateResult();
    }
    else{
      handleOperator(value.type.name);
    }
  }

  return (
    <div className="h-4/6 grid grid-cols-4 grid-rows-5 gap-3 p-4 pb-8">
      <IterateBtn btnValues={btnValues} handleOnClick={handleOnClick} />
    </div>
  )
}
export default ButtonArea;

// This component is responsible for looping through the `btnValues` array 
// and rendering a Button component for each value.
const IterateBtn = ({btnValues, handleOnClick}) => {

  return (
    <>
      {btnValues.map((value, i) => 
        <Button key={i} value={value} 
        onclick={() => handleOnClick(value)}/>
      )}
    </>
  );
} 