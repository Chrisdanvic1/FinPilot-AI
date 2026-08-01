interface ButtonCardProps {
  message: string;
}
const ButtonCard = ({ message }: ButtonCardProps) => {
  return (
    <>
      <button className="">{message}</button>
    </>
  );
};

export default ButtonCard;
