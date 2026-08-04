interface ButtonCardProps {
  message: string;
  disabled: boolean;
}

const ButtonCard = ({ message, disabled }: ButtonCardProps) => {
  return (
    <>
      <button
        type="submit"
        className={`mt-5 w-full text-white bg-blue-700 text-center px-4 py-3 rounded-3xl transition-all duration-200
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-blue-700 hover:bg-blue-800 active:scale-[0.98]"
        }`}
      >
        {message}
      </button>
    </>
  );
};

export default ButtonCard;
