import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [likes, setLikes] = useState(1234);
  const [hasLiked, setHasLiked] = useState(false);

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

  return (
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
  );
};

export default StreamDetails;