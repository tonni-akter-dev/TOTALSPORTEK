import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface StreamCard {
  category: string;
  title: string;
  streamer: string;
  image: string;
}

const streamCards: StreamCard[] = [
  {
    category: "Football",
    title: "Premier League Live",
    streamer: "SportsCenter",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3"
  },
  {
    category: "F1 Racing",
    title: "Monaco Grand Prix",
    streamer: "F1Official",
    image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3"
  },
  {
    category: "NBA",
    title: "Lakers vs Warriors",
    streamer: "NBASports",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3"
  },
  {
    category: "UFC",
    title: "Championship Fight Night",
    streamer: "UFCOfficial",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-4.0.3"
  }
];

const LiveNow = () => {
  return (
    <section className="w-full pt-24 pb-12 space-y-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <img
          src="/lovable-uploads/4ee33159-1aa4-4689-99e2-7507f4cb893f.png"
          alt="World Championship Finals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4" />
            <span className="text-sm">145,232 watching now</span>
          </div>
          <h2 className="text-4xl font-bold mb-2">World Championship Finals</h2>
          <p className="text-lg text-gray-200">ESL Gaming</p>
          <p className="text-sm text-gray-300 mt-2 max-w-2xl">
            Watch the epic conclusion of this year's championship series with the world's
            top teams competing for the grand prize.
          </p>
        </div>
      </div>

      {/* Live Streams Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Live Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streamCards.map((stream, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <img
                  src={stream.image}
                  alt={stream.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  LIVE
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{stream.title}</CardTitle>
                <CardDescription>{stream.streamer}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <span className="text-sm text-muted-foreground">{stream.category}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveNow;