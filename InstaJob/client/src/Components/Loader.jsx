const Loading = ({ size = "w-4 h-4", color = "text-white" }) => {
  return (
    <div
      className={`${size} ${color} border-solid border-r-transparent animate-spin rounded-full border-current border-3`}
    ></div>
  );
};
// const Loading = () => {
//   return (
//     <div className="flex items-center justify-center space-x-2">
//       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//     </div>
//   );
// };

export default Loading;
