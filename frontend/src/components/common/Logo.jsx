import logo from "../../assets/images/aibi-logo.png";

function Logo({ size = "w-20", showText = true }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="AIBI Logo"
        className={`${size} h-auto`}
      />

      {showText && (
        <div>
          <h1 className="text-2xl font-bold text-white">
            AIBI
          </h1>

          <p className="text-xs text-slate-400">
            AI Business Intelligence Platform
          </p>
        </div>
      )}
    </div>
  );
}

export default Logo;