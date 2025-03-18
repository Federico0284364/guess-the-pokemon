import { Pokemon } from "../pokemonApiMock";
import LeftSidebarContent from "./LeftSidebarContent";
import RightSidebarContent from './RightSidebarContent';

export default function Sidebar({
	side = "left",
	hasAnswered = false,
	pokemon = new Pokemon(),
}) {
	return (
		<aside className="flex flex-col overflow-hidden rounded-2xl bg-neutral-500 border-8 border-neutral-700 lg:w-68 h-126">
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
			) : (
				<RightSidebarContent
					hasAnswered={hasAnswered}
					pokemon={pokemon}
				/>
			)}
		</aside>
	);
}
