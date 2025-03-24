import { capitalize } from "../utils/functions";

export default function SelectInput({ ref, optionArray, label, widthClass='flex-1'}) {
	
	return (
		<div className={"flex flex-col items-center min-w-0 " + widthClass}>
			<label className="text-sm">{label}</label>
			<select
			ref={ref}
				className="text-center bg-orange-400 rounded-2xl w-full py-2 border-4 border-neutral-700"
			>
        {optionArray.map((element) => {
          return (<option key={element + label} value={capitalize(element)}>{capitalize(element)}</option>)
        })}
      </select>
		</div>
	);
}
