import { useState, createContext, useEffect, ReactNode, useMemo } from "react";

export type DeviceSize = "small" | "medium" | "large";

export type WindowSizeContext = {
	windowSize: {height: number, width: number}
	device: DeviceSize;
};

type Props = {
	children: ReactNode;
};

export const WindowSizeContext = createContext<WindowSizeContext>({
	windowSize: {width: window.innerWidth, height: window.innerHeight},
	device: "small",
});

export default function WindowSizeContextProvider({ children }: Props) {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const device = useMemo<DeviceSize>(() => {
    if (windowSize.width >= 1120) return "large";
    if (windowSize.width >= 860) return "medium";
    return "small";
  }, [windowSize.width]);

	function handleWindowResize() {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	}

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const context = {
		windowSize: windowSize,
		device: device,
	};

	return (
		<WindowSizeContext.Provider value={context}>
			{children}
		</WindowSizeContext.Provider>
	);
}
