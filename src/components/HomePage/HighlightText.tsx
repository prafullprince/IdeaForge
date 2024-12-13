import { motion } from 'framer-motion';
interface HighlightTextProps {
  text: string;
}

const HighlightText = ({ text }: HighlightTextProps) => {
  return <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{ delay:1, duration:4, ease:'linear' }} className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold">{" "}{text}</motion.span>;
};

export default HighlightText;
