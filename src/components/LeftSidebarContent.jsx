import { useState, useEffect } from 'react';

import { capitalize, getColorByStat, removeDashes } from "../utils/functions";

export default function LeftSidebarContent({pokemon}) {
  let totalStats = 0;
  pokemon.stats.forEach((stat) => {
    totalStats += stat.base_stat;
  })
  console.log(totalStats);
  if (pokemon.stats.length < 7){
    pokemon.stats.push({
      base_stat: totalStats,
          effort: 0,
          stat: {
            name: "total-base-stats",
            url: ''
          },
    })
  }
  
	return (
    
		<div className="ml-2 mt-4 flex flex-col gap-y-3 overflow-auto">
      <h1 className="font-semibold uppercase text-3xl self-center mt-[-6px]">
        Stats
      </h1>
			{pokemon.stats.map((stat) => {
				const statClass = getColorByStat(stat.stat.name);
				const barLength = stat.base_stat / 2.5;

				return (
					<div className="ml-1">
						<label className={`font-semibold ${stat.stat.name === 'hp' ? 'uppercase' : ''}`}>{capitalize(removeDashes(stat.stat.name))}</label>
						<div className="flex items-center h-6 m-0 mt-0">
							<p className="m-0 w-6">{stat.base_stat}</p>
							<div className="ml-1.5 h-full relative w-[72%] bg-neutral-700 rounded-sm">
								<div
									style={ stat.stat.name != 'total-base-stats' ? {width: barLength + "%"} : {width: barLength/6 + "%"} }
									className={
										`h-full rounded-sm absolute left-0 m-0 ` +
										statClass
									}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
