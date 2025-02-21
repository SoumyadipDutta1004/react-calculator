



const Button = ({value, onclick}) => {
  
  return (
    <button 
    onClick={onclick}
    className={`${value === "0" ? "col-span-2" : ""} 
    ${typeof value == "object"? value.type.name === "LuEqual" ? "bg-orange-500 text-white" : "" : ""} 
    ${isNaN(value) && value !== "." ? "text-orange-500" : "text-white"}
    text-3xl font-light bg-neutral-900 rounded-2xl flex justify-center 
    items-center cursor-pointer hover:opacity-75 active:opacity-80`}>
      {value}
    </button>
  )
}

export default Button