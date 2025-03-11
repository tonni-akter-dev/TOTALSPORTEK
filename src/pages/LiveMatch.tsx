import { API_BASE_URL, API_CONFIG } from "@/config/api";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const LiveMatch = ({ theme }) => {
    const [matches, setMatches] = useState([]);

    // Fetch matches
    const getMatches = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/matches`, {
                ...API_CONFIG,
                credentials: "include",
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setMatches(data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    useEffect(() => {
        getMatches();
    }, []);

    // Filter approved matches
    const approvedMatches = matches.filter((match) => match.status === "approved");
    console.log(approvedMatches);

    return (
        <div className={` ${theme === 'dark' ? "bg-gray-900" : 'bg-gray-300'} text-white p-4 rounded-lg`}>
            {/* Header */}


            {/* Matches List */}
            {approvedMatches.length > 0 ? (
                approvedMatches.map((match) => (
                    <div key={match._id} className={`${theme === 'dark' ? "bg-gray-800" : 'bg-white'}  p-3 rounded-lg flex items-center justify-between mb-2`}>
                        {/* Left Side: Live Indicator & Teams */}
                        <div className="flex items-start gap-5">
                            {/* Live Now Indicator */}
                            <div className="border-l-4 border-orange-500 pl-2 mt-2">
                                <p className="text-orange-500 text-xs font-semibold whitespace-nowrap">Live Now!</p>
                            </div>

                            {/* Teams */}
                            <div className="flex flex-col gap-1">
                                {/* Team 1 */}
                                <div className="flex items-center gap-2 mb-2">F
                                    <span className={`text-lg font-bold ${theme == 'light' ? 'text-black' : 'text-white'}`}>{match.match}</span>
                                </div>
                                {/* Team 2 */}
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm ${theme == 'light' ? 'text-black' : 'text-white'}`}>{match.description}</span>
                                </div>
                            </div>
                        </div>

                        {/* External Link Icon */}
                        <a href={match.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className={`opacity-75 hover:opacity-100 cursor-pointer ${theme == "dark" ? 'text-white' : "text-black"}`} />
                        </a>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">No live matches available</p>
            )}
        </div>
    );
};

export default LiveMatch;
