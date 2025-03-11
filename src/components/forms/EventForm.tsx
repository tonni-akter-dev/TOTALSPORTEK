import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config/api";

// Extended Event Form Data
type EventFormData = {
  teamA: string;
  teamB: string;
  category: string;
  league: string;
  title: string;
  eventUrl: string;
  redirectUrls: string;
  startDate: string;
  endDate: string;
  sticky: boolean;
  channels: string;
  embeds: string;
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  pageContent: string;
};

const EventForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const form = useForm<EventFormData>();

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create event');

      const result = await response.json();
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
            {/* Team A */}
            <FormField
              control={form.control}
              name="teamA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team A</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Select Team A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team B */}
            <FormField
              control={form.control}
              name="teamB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team B</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Select Team B" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Select Category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* League */}
            <FormField
              control={form.control}
              name="league"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="League" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event URL */}
            <FormField
              control={form.control}
              name="eventUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Redirect URLs */}
            <FormField
              control={form.control}
              name="redirectUrls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL(s)</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="One URL per line. Don't put domain name."
                      className="w-full h-20 p-2 border rounded-md"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date/Time */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date/Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date/Time */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date/Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="datetime-local" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sticky */}
            <FormField
              control={form.control}
              name="sticky"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sticky</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Channels */}
            <FormField
              control={form.control}
              name="channels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channels</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Select Channel(s)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Embeds */}
            <FormField
              control={form.control}
              name="embeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embeds</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Embed Code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name="pageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Page Title"
                      maxLength={60}
                      onChange={(e) => {
                        setTitleCount(e.target.value.length);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500">{titleCount}/60</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Meta Description"
                      maxLength={160}
                      className="w-full h-20 p-2 border rounded-md"
                      onChange={(e) => {
                        setDescriptionCount(e.target.value.length);
                        field.onChange(e);
                      }}
                    ></textarea>
                  </FormControl>
                  <p className="text-sm text-gray-500">{descriptionCount}/160</p>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Meta Keywords */}
            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Meta Keywords" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Content */}
            <FormField
              control={form.control}
              name="pageContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Content</FormLabel>
                  <FormControl>
                    <textarea {...field} placeholder="Page Content" className="w-full border p-2" rows={5}></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;


