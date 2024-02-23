import Button from "./Button";

export default function NavHeader() {
  return (
    <div
      className="w-auto  flex-grow flex  items-center justify-center 
                py-10 border-b-2 border-b-gray-500 text-xl text-black bg-white"
    >
      <a className="px-20">Home</a>
      <a className="px-20">Account</a>
      <a className="px-20">Plans</a>
    </div>
  );
}
