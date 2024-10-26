import { motion } from "framer-motion";

interface Props {
  slides: number;
  activeSlide: number;
  onChange: (index: number) => void;
}

const SliderPagination = ({ slides, activeSlide, onChange }: Props) => {
  return (
    <div className={"h-[1px] w-full bg-black/20 relative overflow-hidden"}>
      <motion.div
        animate={{
          width: `${(100 / slides) * (activeSlide + 1)}%`,
        }}
        transition={{
          duration: 0.5,
          type: "tween",
        }}
        className={`h-[1px] absolute left-0 w-full bg-black/100 transition duration-500`}
      />
    </div>
  );
};

export default SliderPagination;