import { useContext, useEffect, useMemo } from "react";
import React from "react";
import { useSelector } from "react-redux";

import { AnimatePresence, motion, useAnimate } from "framer-motion";

import { WindowSizeContext } from "../../context/window-size.js";
import { StoreState, getCurrentPokemon } from "../../store/gameSlice.js";
import {
  capitalize,
  getColorByType,
  getInlineColorByType,
} from "../../utils/functions.js";

export default function MainWindow() {
  const { windowSize, device } = useContext(WindowSizeContext);
  const [jumpScope, jump] = useAnimate();
  const { hasAnswered } = useSelector((state: StoreState) => state.game);

  const pokemon = useSelector(getCurrentPokemon);

  let type1Color;
  let type2Color;
  if (pokemon?.types?.[0]) {
    type1Color = useMemo(() => {
      return getInlineColorByType(pokemon.types?.[0]?.type?.name);
    }, [pokemon.id]);
    type2Color = useMemo(() => {
      if (pokemon.types?.length === 1) {
        return;
      }

      return getInlineColorByType(pokemon.types?.[1]?.type.name);
    }, [pokemon.id]);
  }

  /*const backgroundColor = !gameState.hasAnswered
		? "#f0b247"
		: `linear-gradient(45deg, ${type1Color}, ${type2Color || type1Color})`;
*/

  function handleSpriteJump(event?: React.MouseEvent<HTMLElement>): void {
    if (event) {
      jump(
        event.currentTarget as HTMLElement,
        { y: [0, -50, 0, -20, 0, -10, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
    } else {
      jump(
        "img",
        { y: [0, -15, 0, -10, 0, -5, 0] },
        { duration: 0.6, ease: "easeInOut" },
      );
    }
  }

  useEffect(() => {
    if (!hasAnswered) {
      return;
    }
    handleSpriteJump();
  }, [hasAnswered]);

  if (pokemon.sprites.front_default) {
    return (
      <motion.div
        layout
        key={"window"}
        //style={{
        //background: backgroundColor,
        //}}
        className={
          " shadow-lg shadow-black/30 w-full flex flex-col items-center rounded-2xl bg-orange-400 border-7 border-neutral-700 h-55 relative"
        }
      >
        <motion.div
          ref={jumpScope}
          initial={{ scale: 0.1 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 1, transition: { duration: 1 } }}
          className="flex justify-center items-center h-full"
        >
          <AnimatePresence mode="wait">
            {pokemon.sprites.back_default && device != "small" && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  scale: 0,
                  transition: { duration: 0.3 },
                }}
                onClick={(event) => handleSpriteJump(event)}
                key={pokemon.id + "back-sprite"}
                className="w-[90%] h-[90%] mt-[-7px] cursor-pointer"
                src={pokemon.sprites.back_default}
              />
            )}

            {pokemon.sprites.front_default && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  scale: 0,
                  transition: { duration: 0.3 },
                }}
                onClick={(event) => handleSpriteJump(event)}
                key={pokemon.id + "front-sprite"}
                className="w-[90%] h-[90%]  mt-[-7px] cursor-pointer"
                src={pokemon.sprites.front_default}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <div className="w-[101%] mb-[-4px] bg-neutral-700 flex justify-around sm:justify-center items-center gap-1 h-10 relative">
          {hasAnswered && (
            <>
              {windowSize.width >= 640 && (
                <motion.p
                  transition={{ duration: 0.2 }}
                  animate={{ x: [-30, 0], opacity: [0.5, 1] }}
                  className="bg-neutral-800 rounded-full px-3 mt-1 text-lg absolute left-4"
                >
                  {pokemon.id}
                </motion.p>
              )}
              <motion.p
                key={pokemon.name + "name"}
                transition={{ duration: 0.05 }}
                animate={{ scale: [0, 1] }}
                className="text-lg"
              >
                {pokemon.name}
              </motion.p>
            </>
          )}
          <motion.div
            variants={{
              moving: { transition: { staggerChildren: 0.5 } },
              hidden: { opacity: 1 },
            }}
            animate="moving"
            initial="hidden"
            className="flex sm:absolute right-2 "
          >
            {hasAnswered && pokemon.types
              ? pokemon.types.map((type) => {
                  let typeClass = getColorByType(type.type.name);

                  return (
                    <motion.p
                      variants={{
                        moving: {
                          x: [30, 0],
                          opacity: [0.5, 1],
                        },
                        hidden: {
                          x: 30,
                          opacity: 0.5,
                        },
                      }}
                      animate="moving"
                      initial="hidden"
                      transition={{ duration: 0.2 }}
                      key={type.type.name}
                      className={
                        "inline-block text-center text-xs rounded-sm px-2 py-0.5 mt-0.5" +
                        typeClass
                      }
                    >
                      {capitalize(type.type.name)}
                    </motion.p>
                  );
                })
              : ""}
          </motion.div>
        </div>
      </motion.div>
    );
  }
}
