export const ErrorMessage = ({ error }: { error: string | null }) => {
  return (
    <div className="shadow-lg w-full bg-white text-base rounded-md group mt-10 max-w-md border-gray-300 p-4">
      <div className="mt-4 text-red-500  text-center">{error}</div>
    </div>
  );
};
