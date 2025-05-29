export default function ScoreHistoryTable({scoreHistory, difficulty}) {
	const cellStyle = ' border border-neutral-800 rounded bg-neutral-700';
	const headerCellStyle= ' ';

	return (
		<table className=" min-w-[85vw] sm:min-w-[80vw] md:min-w-[35vw]  rounded-2xl text-center border-separate border-spacing-1 table-fixed border-neutral-800 border-4 bg-orange-400 pb-1 px-1 shadow-md shadow-black/50">
			<thead>
				<tr>
					<th className={"w-[20vw]" + headerCellStyle}>Date</th>
					<th className={"w-[10vw]" + headerCellStyle}>Score</th>
				</tr>
			</thead>
			<tbody>
				{scoreHistory.map((entry) => {
					const formattedDate = new Date(entry.date).toLocaleString(
						"en-GB",
						{
							year: "numeric",
							month: "short",
							day: "2-digit",
							hour: "2-digit",
							minute: "2-digit",
							second: undefined, // o non includi proprio secondi
							hour12: false, // opzionale, per ora 24h
						}
					);
					return (
						<tr>
							<td className={cellStyle}>{formattedDate}</td>
							<td className={cellStyle}>{entry.score}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
