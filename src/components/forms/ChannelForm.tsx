// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/components/ui/use-toast";

// type ChannelFormData = {
//   name: string;
//   logo_url: string;
//   description: string;
// };

// const ChannelForm = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const form = useForm<ChannelFormData>();

//   const onSubmit = async (data: ChannelFormData) => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("channels").insert([data]);
//       if (error) throw error;
//       toast({
//         title: "Success",
//         description: "Channel created successfully",
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
//         <CardTitle>Create Channel</CardTitle>
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
//                     <Input {...field} placeholder="Channel name" />
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
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} placeholder="Channel description" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={loading}>
//               {loading ? "Creating..." : "Create Channel"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ChannelForm;
// --------------------------------------------------------------------------------------------------------------------------------------------------
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
      const response = await fetch('/api/channels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

            {/* Style */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Style</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Channel Style" />
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

            {/* Canonical */}
            <FormField
              control={form.control}
              name="canonical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Canonical" />
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
                      placeholder="One URL per line, don't put domain name"
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
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Image (40x40)</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enabled */}
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Enabled</FormLabel>
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
                  <FormLabel>Channel Order</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Order" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Embed Code */}
            <FormField
              control={form.control}
              name="embed_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Embed</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Embed Code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Title */}
            {/* <FormField
              control={form.control}
              name="page_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Page Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}



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
            {/* <FormField
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}


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
                    <Textarea
                      {...field}
                      placeholder="Page Content"
                      className="h-40"
                    />
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
