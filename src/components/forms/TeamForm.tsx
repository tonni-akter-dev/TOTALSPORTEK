// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/components/ui/use-toast";

// type TeamFormData = {
//   name: string;
//   logo_url: string;
// };

// const TeamForm = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const form = useForm<TeamFormData>();

//   const onSubmit = async (data: TeamFormData) => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("teams").insert([data]);
//       if (error) throw error;
//       toast({
//         title: "Success",
//         description: "Team created successfully",
//       });
//       form.reset();
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Create Team</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="Team name" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="logo_url"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Logo URL</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="Logo URL" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Team"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default TeamForm;


// --------------------------------------------------------------------------------------------------------------------------------------------
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useTeamsLeagues } from '@/context/TeamsLeaguesContext';
import { fetchTeams } from "@/api/teamsLeagues";

type TeamFormData = {
  name: string;
  seo_name: string;
  team_url: string;
  redirect_urls: string;
  team_image: File | null;
  show_on_menu: string;
  show_on_other_menus: string;
  order: number;
  page_title: string;
  meta_description: string;
  meta_keywords: string;
  page_content: string;
};

const TeamForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<TeamFormData>();
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const { updateTeams } = useTeamsLeagues();

  const onSubmit = async (data: TeamFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create team');

      const result = await response.json();
      toast({
        title: "Success",
        description: "Team created successfully",
      });
      form.reset();

      // After successful update
      const updatedTeams = await fetchTeams(); // Implement this function
      updateTeams(updatedTeams);
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
        <CardTitle>Add Team</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Team Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Team Name" />
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

            {/* Team URL */}
            <FormField
              control={form.control}
              name="team_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Team URL" />
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
                    <textarea
                      {...field}
                      placeholder="One URL per line, don't put domain name"
                      className="w-full h-20 p-2 border border-gray-300 rounded"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team Image */}
            <FormField
              control={form.control}
              name="team_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Image (49x49)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show on Menu */}
            <FormField
              control={form.control}
              name="show_on_menu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show on Menu</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show on Other's Menu */}
            <FormField
              control={form.control}
              name="show_on_other_menus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show Team on Other's Menu</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
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
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Title */}
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

            {/* Meta Description */}
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

            {/* Meta Keywords */}
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

            {/* Page Content */}
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
                      className="w-full h-20 p-2 border border-gray-300 rounded"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Team"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TeamForm;
