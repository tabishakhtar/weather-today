import { WiDayCloudy } from "react-icons/wi";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      
      {/* Logo Icon */}
      <WiDayCloudy className="text-7xl text-sky-300 animate-bounce mb-4" />

      {/* Title */}
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
        Weather Today
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-slate-300 text-sm tracking-wide">
        Loading live weather...
      </p>
    </div>
  );
}
