import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Match } from "@/models/Match";

interface MatchFormDialogProps {
  match: Match;
  onSave: (updatedMatch: Match) => void;
  onCancel: () => void;
}

const MatchFormDialog = ({ match, onSave, onCancel }: MatchFormDialogProps) => {
  const [formData, setFormData] = useState<Match>(match);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Match</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Match Name</Label>
            <Input
              name="match"
              value={formData.match}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Stream Link</Label>
            <Input
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MatchFormDialog; 