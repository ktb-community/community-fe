interface HelperTextProps {
  text: string;
}

const HelperText = ({ text }: HelperTextProps) => {
  return (
    <div className="w-[500px] h-[14px]">
      <p className="text-red-500 text-[12px] break-words">{text}</p>
    </div>
  );
};

export default HelperText;