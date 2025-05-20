import { useState, createContext, useEffect } from "react";

export const WindowSizeContext = createContext({
	width: window.innerWidth,
	height: window.innerHeight,
  device: 'small'
});


let device;

export default function WindowSizeContextProvider({ children }) {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	function handleWindowResize() {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	}

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		// Cleanup: rimuove l'event listener quando il componente si smonta
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	if (windowSize.width >= 1120) {
		device = "large";
	} else if (windowSize.width >= 860) {
		device = "medium";
	} else {
		device = "small";
	}
	const context = {
    windowSize: windowSize,
    device: device,
  }

	return (
		<WindowSizeContext.Provider value={context}>
			{children}
		</WindowSizeContext.Provider>
	);
}
