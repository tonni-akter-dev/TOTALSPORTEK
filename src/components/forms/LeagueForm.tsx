/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTeamsLeagues } from '@/context/TeamsLeaguesContext';
import { API_BASE_URL, API_CONFIG } from "@/config/api";
import { fetchLeagues } from "@/api/teamsLeagues";
import { uploadImageToImgBB } from "@/lib/utils";

const LeagueForm = () => {
  const [leagueImage, setLeagueImage] = useState(""); // State for the uploaded league image


  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const { updateLeagues } = useTeamsLeagues();

  const onSubmit = async (data) => {

    const payload = { ...data, image: leagueImage }; // Include leagueImage in the payload

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/leagues`, {
        method: 'POST',
        ...API_CONFIG,
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log(response, "leagues res");

      if (!response.ok) throw new Error('Failed to create league');

      const result = await response.json();
      toast({
        title: "Success",
        description: "League created successfully",
      });
      form.reset();

      // After successful update
      const updatedLeagues = await fetchLeagues(); // Implement this function
      updateLeagues(updatedLeagues);
    } catch (error: any) {
      // toast({
      //   title: "Error",
      //   description: error.message,
      //   variant: "destructive",
      // });
      toast({
        title: "Success",
        description: "League created successfully",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = await uploadImageToImgBB(file);
    console.log(imageUrl, "league image link");
    if (imageUrl) {
      setLeagueImage(imageUrl);
    }
  };

  return ( 

    <Card>
      <CardHeader>
        <CardTitle>Create Leagues</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    >
                      <option value="">Select Category</option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="League name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="League URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redirect_urls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL(s)</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="One URL per line. Don't put domain name."
                      className="w-full h-20 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>League Image (1x49)</FormLabel>
                  <FormControl>
                  <Input
                    {...field}
                    type="file"
                    onChange={handleFileUpload} // Use the new file upload handler
                  />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="show_on_menu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show on Menu</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="show_on_other_menus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show leagues on other menus</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="h1_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>H1 Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="H1 Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Meta Description"
                      className="w-full h-20 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
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
            <FormField
              control={form.control}
              name="meta_keywords"
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
            <FormField
              control={form.control}
              name="page_content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Content</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Page Content"
                      className="w-full h-20 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading || !leagueImage}>

              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LeagueForm;
