export const Quote = ({text}: {text: string}) => {
  return (
    <div className="shadow-sm min-h-10 max-h-40 text-base rounded-md m-2 border-gray-300 border-[1px] p-2">
      <p>{text}</p>
    </div>
  );
};
