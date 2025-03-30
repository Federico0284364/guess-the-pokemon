export default function NextButton({onClick}) {
	return (
		<button
			onClick={onClick}
			className="h-14 cursor-pointer text-lg mt-4 mb-5 md:mb-0 bg-stone-600 py-2 px-8 rounded-sm w-full"
		>
			Next
		</button>
	);
}
