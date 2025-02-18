import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] mt-8">
      <div className="max-w-[2000px] mx-auto">
        {/* Title Section */}
        <div className="border-b border-[#333] p-6">
          <h2 className="text-2xl font-bold text-orange-500">Totalsportek - LIVE STREAMS</h2>
          <p className="text-gray-300 mt-2">
            Totalsportek New, fast and mobile friendly layout bringing you best live streaming NFL Stream, NBA Stream, F1 Live Stream, UFC Stream
          </p>
        </div>

        {/* Copyright Section */}
        <div className="p-4 text-center text-gray-400">
          <p>© 2024, All Rights Reserved</p>
          <p className="mt-1">
            Always free website. Visit the homepage at{" "}
            <Link 
              to="/"
              className="text-gray-300 hover:text-orange-500 transition-colors underline"
            >
              TOTALSPORTEK
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 