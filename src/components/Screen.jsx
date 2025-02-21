import { useCalculatorContext } from "../context/CalculatorContext"



const Screen = () => {

  const {currentValue, previousValue, operator} = useCalculatorContext();

  return (
    <div className="h-2/6 p-4 flex flex-col items-end justify-end gap-2">
      <p className="text-neutral-500 text-xl font-semibold">
        {previousValue} {operator}
      </p>
      <p className="text-white text-5xl font-bold">
        {currentValue}
      </p>
    </div>
  )
}

export default Screen