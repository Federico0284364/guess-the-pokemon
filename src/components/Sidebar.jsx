import { Pokemon } from "../utils/pokemonApiMock";
import LeftSidebarContent from "./LeftSidebarContent";
import RightSidebarContent from './RightSidebarContent';

export default function Sidebar({
	isOver = false,
	side = null,
	hasAnswered = false,
	pokemon = new Pokemon(),
}) {
	let isOverClass = 'sm:h-117 ';
	if (isOver){
		isOverClass = 'sm:h-150 '
	}

	return (
		<aside className={isOverClass + " mb-6 pb-2 md:pb-0 md:mb-0 md:mt-0 flex flex-col overflow-hidden rounded-2xl bg-neutral-500 border-8 border-neutral-700 md:w-38 lg:w-68"}>
			{!hasAnswered ? (
				<img
					className="object-cover w-full h-full rounded-lg"
					src="/vertical.jpg"
				/>
			) : side === "left" ? (
				<LeftSidebarContent
					hasAnswered={hasAnswered}
					pokemon={pokemon}
				/>
			) : side === 'right' ? (
				<RightSidebarContent
					hasAnswered={hasAnswered}
					pokemon={pokemon}
				/>
			) : ''}
		</aside>
	);
}
