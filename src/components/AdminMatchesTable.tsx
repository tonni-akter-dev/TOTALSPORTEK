import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from '@/config/api';
import { Pencil, Trash } from 'lucide-react';
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

// Demo data that matches the MatchForm structure
const demoMatches: Match[] = [
  {
    _id: '1',
    match: 'Manchester United vs Arsenal',
    link: 'https://stream1.example.com/mu-arsenal',
    description: 'Premier League Match Day 15',
    status: 'pending',
    submittedBy: 'john.doe@example.com',
    submittedAt: new Date().toISOString()
  },
  {
    _id: '2',
    match: 'Real Madrid vs Barcelona',
    link: 'https://stream2.example.com/rm-barca',
    description: 'El Clasico - La Liga',
    status: 'approved',
    submittedBy: 'jane.smith@example.com',
    submittedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    _id: '3',
    match: 'Bayern Munich vs Dortmund',
    link: 'https://stream3.example.com/bayern-bvb',
    description: 'Bundesliga Der Klassiker',
    status: 'rejected',
    submittedBy: 'mike.wilson@example.com',
    submittedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    _id: '4',
    match: 'Liverpool vs Manchester City',
    link: 'https://stream4.example.com/liv-city',
    description: 'Premier League Top 4 Battle',
    status: 'pending',
    submittedBy: 'sarah.jones@example.com',
    submittedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
  }
];

const AdminMatchesTable = () => {
  const [matches, setMatches] = useState<Match[]>(demoMatches);
  const [loading, setLoading] = useState(false);
  const [editMatch, setEditMatch] = useState<Match | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      // For demo purposes, delete locally
      setMatches(matches.filter(match => match._id !== id));
      
      toast({
        title: "Success",
        description: "Match deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete match",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (match: Match) => {
    setEditMatch(match);
  };

  const handleSaveEdit = (updatedMatch: Match) => {
    setMatches(matches.map(match => 
      match._id === updatedMatch._id ? updatedMatch : match
    ));
    setEditMatch(null);
    toast({
      title: "Success",
      description: "Match updated successfully",
    });
  };

  return (
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
          {matches.map((match) => (
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

      {editMatch && (
        <MatchFormDialog
          match={editMatch}
          onSave={handleSaveEdit}
          onCancel={() => setEditMatch(null)}
        />
      )}
    </div>
  );
};

export default AdminMatchesTable; 