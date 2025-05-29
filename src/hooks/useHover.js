import { useState, useRef, useEffect } from "react";

export function useHover() {
	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		node.addEventListener("mouseenter", handleMouseEnter);
		node.addEventListener("mouseleave", handleMouseLeave);

		// Cleanup
		return () => {
			node.removeEventListener("mouseenter", handleMouseEnter);
			node.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [ref]);

	return [ref, isHovered];
}
