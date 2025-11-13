import { useMemo } from "react";
import { useSelector } from "react-redux";

import { twMerge } from "tailwind-merge";

import { Stat } from "../../models/pokemonStats";
import { getCurrentPokemon } from "../../store/gameSlice";
import {
  capitalize,
  getColorByStat,
  removeDashes,
} from "../../utils/functions";
import { safeClone } from "../../utils/utilFunctions";

//this sidebar show a list of the pokemon stats
export default function LeftSidebarContent() {
  const pokemon = useSelector(getCurrentPokemon);
  const stats = safeClone(pokemon.stats);
  let totalStats = 0;

  useMemo(() => {
    stats.forEach((stat: Stat) => {
      totalStats += stat.base_stat;
    });
    if (stats.length < 7) {
      stats.push({
        base_stat: totalStats,
        effort: 0,
        stat: {
          name: "total-base-stats",
          url: "",
        },
      });
    }
  }, [pokemon]);

  return (
    <div className="ml-2 mt-4 flex flex-col h-full gap-y-2.5 overflow-hidden">
      <h1 className="font-semibold uppercase text-3xl self-center mt-[-6px]">
        Stats
      </h1>
      {stats.map((stat) => {
        const statClass = getColorByStat(stat.stat.name);
        const barLength = stat.base_stat / 2.5;

        return (
          <div key={Math.random()} className="ml-1">
            <label className={` ${stat.stat.name === "hp" ? "uppercase" : ""}`}>
              {capitalize(removeDashes(stat.stat.name))}
            </label>
            <div className="flex items-center h-5 m-0">
              <p className="m-0 w-6 text-[15px]">{stat.base_stat}</p>
              <div className="ml-1.5 h-full w-[72%] bg-neutral-700 rounded-sm">
                <div
                  style={
                    stat.stat.name != "total-base-stats"
                      ? { width: barLength + "%" }
                      : { width: barLength / 6 + "%" }
                  }
                  className={twMerge(
                    `z-10 h-full rounded-sm left-0 m-0 `,
                    statClass,
                  )}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
