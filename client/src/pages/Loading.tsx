import LoadingEarth from "../assets/images/logo.png";

export const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img
        src={LoadingEarth}
        alt="Loading"
        className="w-20 h-20 animate-bounce"
      />
    </div>
  );
};
