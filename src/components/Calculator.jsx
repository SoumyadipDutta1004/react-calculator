import CalculatorButtons from "./ButtonArea"
import Screen from "./Screen"

import { CalculatorProvider } from "../context/CalculatorContext"


const Calculator = () => {

  return (
    <div className="h-dvh lg:h-[80dvh] w-screen lg:w-md lg:rounded-2xl lg:mx-auto lg:mt-14 bg-neutral-950 ">
      <CalculatorProvider>
        <Screen />
        <CalculatorButtons />
      </CalculatorProvider>
    </div>
  );
}

export default Calculator;

