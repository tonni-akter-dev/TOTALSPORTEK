/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL, API_CONFIG } from "@/config/api";

type ChannelFormData = {
  name: string;
  seo_name: string;
  style: string;
  url: string;
  canonical: string;
  redirect_urls: string;
  in_submenu: string;
  image: File | null;
  enabled: string;
  order: number;
  embed_code: string;
  page_title: string;
  meta_description: string;
  meta_keywords: string;
  page_content: string;
};

const ChannelForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const form = useForm<ChannelFormData>();

  const onSubmit = async (data: ChannelFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/channel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...API_CONFIG,
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create channel');

      const result = await response.json();
      toast({
        title: "Success",
        description: "Channel created successfully",
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
        <CardTitle>Add Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Channel Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Channel Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SEO Name */}
            <FormField
              control={form.control}
              name="seo_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel SEO Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SEO Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Channel URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Redirect URLs */}
            <FormField
              control={form.control}
              name="redirect_urls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL(s)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="One URL per line"
                      className="h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* In Submenu */}
            <FormField
              control={form.control}
              name="in_submenu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel in Submenu</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Image</FormLabel>
                  <FormControl>
                    <Input
                           type="file"
                     onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file.name);
                      console.log("Selected File Name:", file ? file.name : "No file selected");
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order */}
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Order</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Title with Character Counter */}
            <FormField
              control={form.control}
              name="page_title"
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

            {/* Meta Description with Character Counter */}
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Meta Description"
                      className="h-20"
                      maxLength={160}
                      onChange={(e) => {
                        setDescriptionCount(e.target.value.length);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500">{descriptionCount}/160</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Content */}
            <FormField
              control={form.control}
              name="page_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Page Content" className="h-40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Channel"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChannelForm;
