import { motion } from "framer-motion";

import pokeballImg from "../../assets/pokeball.png";

type Props = {
  children?: string;
};

export default function LoadingScreen({ children = "loading..." }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 overflow-hidden">
      <p className="mt-6 text-6xl">{children}</p>
      <motion.img
        src={pokeballImg}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
        }}
        className="w-16 aspect-square"
      />
    </div>
  );
}
