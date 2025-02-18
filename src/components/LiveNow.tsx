import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '@/config/api';

interface Stream {
  _id: string;
  title: string;
  viewCount: number;
  description: string;
  streamUrl: string;
  thumbnailUrl: string;
  category: string;
  isLive: boolean;
}

const streamCards: StreamCard[] = [
  {
    id: "1",
    category: "Football",
    title: "Premier League Live",
    streamer: "SportsCenter",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3"
  },
  {
    id: "2",
    category: "F1 Racing",
    title: "Monaco Grand Prix",
    streamer: "F1Official",
    image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3"
  },
  {
    id: "3",
    category: "NBA",
    title: "Lakers vs Warriors",
    streamer: "NBASports",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3"
  },
  {
    id: "4",
    category: "UFC",
    title: "Championship Fight Night",
    streamer: "UFCOfficial",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-4.0.3"
  }
];

const LiveNow = () => {
  const [mostWatched, setMostWatched] = useState<Stream | null>(null);
  const [liveStreams, setLiveStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        // Fetch most watched stream
        const mostWatchedRes = await fetch(`${API_BASE_URL}/api/streams/most-watched`);
        const mostWatchedData = await mostWatchedRes.json();
        
        // Fetch all live streams
        const liveStreamsRes = await fetch(`${API_BASE_URL}/api/streams/live`);
        const liveStreamsData = await liveStreamsRes.json();
        
        setMostWatched(mostWatchedData);
        // Filter out the most watched stream from live streams to avoid duplication
        setLiveStreams(liveStreamsData.filter(stream => stream._id !== mostWatchedData._id));
      } catch (error) {
        console.error('Error fetching streams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full pt-24 pb-12 space-y-8">
      {/* Most Watched Stream Hero Section */}
      {mostWatched && (
        <Link to={`/stream/${mostWatched._id}`} className="block">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
            <img
              src={mostWatched.thumbnailUrl}
              alt={mostWatched.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{mostWatched.viewCount.toLocaleString()} watching now</span>
              </div>
              <h2 className="text-4xl font-bold mb-2">{mostWatched.title}</h2>
              <p className="text-lg text-gray-200">Most Watched Stream</p>
              <p className="text-sm text-gray-300 mt-2 max-w-2xl">
                {mostWatched.description}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Live Streams Grid */}
      {liveStreams.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Live Now</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveStreams.map((stream) => (
              <Link key={stream._id} to={`/stream/${stream._id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <img
                      src={stream.thumbnailUrl}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      LIVE
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {stream.viewCount.toLocaleString()}
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{stream.title}</CardTitle>
                    <CardDescription>{stream.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {stream.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LiveNow;