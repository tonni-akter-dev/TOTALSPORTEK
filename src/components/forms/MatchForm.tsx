import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config/api";

interface MatchFormData {
  match: string;
  link: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
}

const MatchForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<MatchFormData>();

  const onSubmit = async (data: MatchFormData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token from your auth system
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...data,
          status: 'pending',
          submittedBy: localStorage.getItem('userEmail') // Or get from your auth context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit match');
      }

      toast({
        title: "Success",
        description: "Match submitted for approval",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit match",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Match</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="match"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter match title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter stream link" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter match description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Match"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MatchForm;
