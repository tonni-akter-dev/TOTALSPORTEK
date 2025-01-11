import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type EventFormData = {
  title: string;
  team1_id: string;
  team2_id: string;
  league_id: string;
  start_time: string;
};

const EventForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("events").insert([data]);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team1_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team 1</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Team 1 ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team2_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team 2</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Team 2 ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="league_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="League ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;