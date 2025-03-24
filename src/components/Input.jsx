export default function Input({ref, label, widthClass}){
  return (
    <div className={"flex flex-col items-center min-w-0 " + widthClass}>
				<label className="text-sm">{label}</label>
				<input ref={ref} className=" bg-orange-400 rounded-2xl w-full py-2 border-4 border-neutral-700" />
			</div>
  )
}