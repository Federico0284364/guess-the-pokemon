export default function GameOption({game, onClick}) {
	
	return (
		<div onClick={() => onClick(game.name)} className="flex flex-col rounded-2xl justify-around h-60 border-1 cursor-pointer bg-orange-400">
			<img className="w-50 m-auto" src={game.image}/>
			<p className="h-8 text-center">{game.name}</p>
		</div>
	);
}
