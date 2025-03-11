import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL, API_CONFIG } from '@/config/api';
import { Pencil, Trash, Search } from 'lucide-react';
import MatchFormDialog from './MatchFormDialog';

interface Match {
  _id: string;
  match: string;
  link: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
}
const AdminMatchesTable = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMatch, setEditMatch] = useState<Match | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    getmatches();
  }, []);


  const getmatches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/matches`, {
        ...API_CONFIG,
        credentials: 'include',
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); 
      setMatches(data); 
      console.log(data, "matches");
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/matches/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Match deleted successfully",
        });

        getmatches();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete match');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete match",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (match: Match) => {
    setEditMatch(match);
  };

  const handleEditMatch = async (updatedMatch: Match) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/matches/${updatedMatch._id}`, {
        ...API_CONFIG,
        method: "PATCH",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedMatch.status }),
      });

      if (!response.ok) {
        throw new Error(`Error updating match: ${response.statusText}`);
      }

      const data = await response.json();
      setMatches(matches.map(match =>
        match._id === data._id ? data : match
      ));

      setEditMatch(null);

      toast({
        title: "Success",
        description: "Match updated successfully",
      });
    } catch (error) {
      console.error("Error updating match:", error);
      toast({
        title: "Error",
        description: "Failed to update match",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search matches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Matches Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Match</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches?.map((match) => (
              <TableRow key={match._id}>
                <TableCell className="font-medium">{match.match}</TableCell>
                <TableCell>{match.description}</TableCell>
                <TableCell>{match.submittedBy}</TableCell>
                <TableCell>{new Date(match.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${match.status === 'approved' ? 'bg-green-100 text-green-800' :
                      match.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                    {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(match)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(match._id)}
                  >
                    <Trash className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editMatch && (
        <MatchFormDialog
          match={editMatch}
          onSave={handleEditMatch}
          onCancel={() => setEditMatch(null)}
        />
      )}
    </div>
  );
};

export default AdminMatchesTable; 