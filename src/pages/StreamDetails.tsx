import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from '@/config/api';
import { useTheme } from "next-themes";

interface RecommendedStream {
  id: string;
  title: string;
  streamer: string;
  viewers: number;
  category: string;
}

interface AlternativeLink {
  platform: string;
  url: string;
  quality: string;
}

const StreamDetails = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [likes, setLikes] = useState(1234);
  const [hasLiked, setHasLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const alternativeLinks: AlternativeLink[] = [
    {
      platform: "Stream Link 1",
      url: "#",
      quality: "1080p"
    },
    {
      platform: "Stream Link 2",
      url: "#",
      quality: "720p"
    },
    {
      platform: "Stream Link 3",
      url: "#",
      quality: "480p"
    }
  ];

  const recommendedStreams: RecommendedStream[] = [
    {
      id: "2",
      title: "Champions League Highlights",
      streamer: "SportsCenter",
      viewers: 85000,
      category: "Football"
    },
    {
      id: "3",
      title: "NBA Playoffs Live",
      streamer: "NBASports",
      viewers: 120000,
      category: "Basketball"
    },
    {
      id: "4",
      title: "F1 Race Commentary",
      streamer: "F1Official",
      viewers: 95000,
      category: "Racing"
    }
  ];

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  useEffect(() => {
    const updateViewCount = async () => {
      try {
        await fetch(`${API_BASE_URL}/api/streams/${streamId}/view`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Error updating view count:', error);
      }
    };

    updateViewCount();
  }, [streamId]);

  const handleAddUrls = () => {
    navigate("/login");
  };
  

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white" : "bg-[#1a1a1a]"}`}>
      {/* Add URLs Button */}
      <div className="p-4 flex justify-end">

<Button
  onClick={handleAddUrls}
  className={`${theme === "light" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white"}`}
>
  Add URLs
</Button>
      </div>

      {/* Modal for Adding URLs */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${theme === "light" ? "bg-white" : "bg-[#2a2a2a]"} p-6 rounded-lg`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Add URLs
            </h2>
            <input
              type="text"
              placeholder="Enter URL"
              className={`w-full p-2 mb-4 ${theme === "light" ? "bg-white border-gray-300 text-gray-900" : "bg-[#3a3a3a] border-[#4a4a4a] text-white"}`}
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className={`${theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-gray-900" : "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white"}`}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle URL submission
                  setIsModalOpen(false);
                }}
                className={`${theme === "light" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white"}`}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Streaming Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back to Streams
        </Link>

        {/* Stream Title and Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">World Championship Finals</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              145,232 viewers
            </span>
            <span>2 hours remaining</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-lg mb-8">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p>Stream Player</p>
          </div>
        </div>

        {/* Alternative Links Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Alternative Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alternativeLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {link.platform}
                    <span className="text-sm font-normal text-muted-foreground">
                      {link.quality}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Watch Here
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Likes Section */}
        <div className="mb-8">
          <Button
            variant={hasLiked ? "default" : "outline"}
            onClick={handleLike}
            className="gap-2"
          >
            <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
            {likes.toLocaleString()} Likes
          </Button>
        </div>

        {/* Recommended Streams */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recommended Streams</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedStreams.map((stream) => (
              <Link
                key={stream.id}
                to={`/stream/${stream.id}`}
                className="group block space-y-2"
              >
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    Stream Thumbnail
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {stream.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stream.streamer} • {stream.viewers.toLocaleString()} viewers
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamDetails;