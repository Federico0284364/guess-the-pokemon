import pikachuImg from '../assets/pikachu.png';

export default function GameOption({game, onClick}) {
	
	return (
		<div onClick={() => onClick(game.name)} className="hover:scale-103 hover:translate-y-[-8px] transition-[2] shadow-lg shadow-black flex flex-col items-center rounded-2xl justify-around border-1 cursor-pointer bg-orange-400 pb-4">
			<img className="w-50 m-auto" src={pikachuImg}/>
			<button className=" border-neutral-300 border rounded-xl text-5xl bg-neutral-700 text-center px-6 py-2 cursor-pointer">Start</button>
		</div>
	);
}
