import { Moon, Sun, Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";

const EventDetails = () => {
    const { theme, setTheme } = useTheme();
    const [events, setEvents] = useState({})
    const { eventId } = useParams();

    useEffect(() => {
        const eventsDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        eventsDetails();
    }, [eventId]);

    console.log(events.eventUrl, "events details");

    return (
        <div>
            <header className="border-b sticky top-0 z-50 bg-background">
                <div className="flex items-center justify-between px-4 py-3 max-w-[2000px] mx-auto">
                    <h1 className="text-xl font-bold text-orange-500">TOTALSPORTEK</h1>
                    <div className="flex items-center gap-2 md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                                <nav className="flex flex-col space-y-4 mt-4">
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">FOOTBALL</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">F1</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NFL</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NBA</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NHL</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">UFC</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">BOXING</a>
                                    <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">RUGBY</a>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">FOOTBALL</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">F1</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NFL</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NBA</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NHL</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">UFC</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">BOXING</a>
                        <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">RUGBY</a>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hidden md:flex"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </nav>
                </div>
            </header>
            <div className={`${theme == "dark" ? 'bg-black' : "bg-white"}  flex justify-center p-4`}>
                <div className={` ${theme == "dark" ? 'bg-gray-900 text-white' : "text-black bg-white"}  w-full max-w-4xl rounded-lg shadow-lg overflow-hidden`}>
                    <div className={`${theme == "dark" ? 'bg-gray-700 text-white' : "text-black bg-gray-100"}  flex justify-between items-center p-4`}>
                        <div className="flex gap-2 items-center">
                            {/* <img src="/f1-logo.png" alt="F1 Logo" className="h-6" /> */}
                            <p>{events.teamA}</p>
                        </div>
                        <h2 className="text-lg font-semibold">Live Now!</h2>
                        <div className="flex gap-2 items-center">
                            {/* <img src="/f1-logo.png" alt="F1 Logo" className="h-6" /> */}
                            <p>{events.teamB}</p>
                        </div>
                        {/* <img src="/f1-logo.png" alt="F1 Logo" className="h-6" /> */}
                    </div>
                    <div className="p-4">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className={`  ${theme == "dark" ? 'text-gray-300' : "text-gray-700"} `}>
                                    <th>League</th>
                                    <th>Channel</th>
                                    <th>Start Date</th>
                                    <th>Description</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={`${theme == "dark" ? 'bg-gray-800 text-gray-300' :
                                    "text-gray-700 "}   text-sm`}>
                                    <td>
                                        {events.league}
                                    </td>
                                    <td>{events.channels}</td>
                                    <td>
                                        {new Date(events.startDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        {events.metaDescription}
                                    </td>
                                    <td>
                                        <Link to={`${events.eventUrl}`}>sdfds</Link>
                                        {/* <Link to={events.eventUrl}  className="text-black hover:underline">
                                            Watch
                                        </Link> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EventDetails