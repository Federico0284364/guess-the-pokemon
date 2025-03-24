export default function NextButton({onClick}) {
	return (
		<button
			onClick={onClick}
			className="cursor-pointer text-lg mt-2 mb-5 md:mb-0 bg-stone-600 py-2 px-8 rounded-sm w-full"
		>
			Next
		</button>
	);
}
