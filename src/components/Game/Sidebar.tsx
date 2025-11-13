import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

import sidebarImg from "../../assets/sidebar-wallpapers/vertical.jpg";
import { selectRandomImage } from "../../utils/selectImage";
import LeftSidebarContent from "./LeftSidebarContent";
import RightSidebarContent from "./RightSidebarContent";

type Props = {
  isOver: boolean;
  side: "right" | "left" | null;
  hasAnswered: boolean;
};

enum SideDirection {
  left = -1,
  right = 1,
}

export default function Sidebar({
  isOver = false,
  side,
  hasAnswered = false,
}: Props) {
  if (!side) {
    return null;
  }

  let initialX: number = SideDirection[side] * 200;

  return (
    <motion.aside
      initial={{ x: initialX }}
      animate={{ x: 0 }}
      className={twMerge(
        "shadow-lg shadow-black/30 bg-neutral-500 border-8 border-neutral-700",
        "flex flex-col w-full z-150 relative mb-6 pb-2 md:pb-0 md:mb-0 md:mt-0 overflow-hidden rounded-2xl  md:w-38 lg:w-68",
        isOver ? "md:h-155" : "md:h-117",
      )}
    >
      <AnimatePresence>
        {!hasAnswered ? (
          <motion.img
            key={sidebarImg}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.3,
                duration: 0.6,
                type: "spring",
                bounce: 0.25,
              },
            }}
            exit={{
              x: side === "left" ? -300 : 300,
              transition: { duration: 0.6 },
            }}
            className="absolute object-cover w-full h-full rounded-lg"
            src={!isOver ? sidebarImg : selectRandomImage()}
          />
        ) : (
          <motion.div
            exit={{
              x: [0, 300 * SideDirection[side]],
              transition: { duration: 0.3 },
            }}
          >
            {side === "left" ? <LeftSidebarContent /> : <RightSidebarContent />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}