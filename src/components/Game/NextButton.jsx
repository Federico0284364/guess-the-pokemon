
export default function NextButton({onClick}) {

	return (
		<motion.button
		transition={{type: 'tween', duration: 0.1}}
		initial={{opacity: 0, y: -100}}
		animate={{opacity: 1, y: 0}}
			onClick={onClick}
			className="h-12 cursor-pointer text-lg mt-3 mb-4 md:mb-0 bg-stone-600 px-8 rounded-sm w-full"
		>
			Next
		</motion.button>
	);
}
