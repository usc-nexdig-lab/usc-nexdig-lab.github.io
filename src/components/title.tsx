interface TitleProps {
  content: string;
  className?: string; // Optional className prop
}

export const Title = ({ content, className }: TitleProps) => {
  return <h1 className={`text-[30px] mb-[30px] ${className}`}>{content}</h1>;
};
