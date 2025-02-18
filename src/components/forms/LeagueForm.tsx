// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/components/ui/use-toast";

// type LeagueFormData = {
//   name: string;
//   logo_url: string;
// };

// const LeagueForm = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const form = useForm<LeagueFormData>();

//   const onSubmit = async (data: LeagueFormData) => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("leagues").insert([data]);
//       if (error) throw error;
//       toast({
//         title: "Success",
//         description: "League created successfully",
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
//         <CardTitle>Create League</CardTitle>
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
//                     <Input {...field} placeholder="League name" />
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
//               {loading ? "Creating..." : "Create League"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default LeagueForm;
// -----------------------------------------------------------------------------------------------------------------------------
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/components/ui/use-toast";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// const LeagueForm = () => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const { register, handleSubmit, reset } = useForm();
//   const [titleCount, setTitleCount] = useState(0);
// const [descriptionCount, setDescriptionCount] = useState(0);
//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.from("leagues").insert([data]);
//       if (error) throw error;
//       toast({
//         title: "Success",
//         description: "League created successfully",
//       });
//       reset();
//     } catch (error) {
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
//     <div className=" max-w-full p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Create League</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium">
//             Category
//           </label>
//           <select
//             id="category"
//             {...register("category")}
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           >
//             <option value="">Select Category</option>
//             <option value="Category 1">Category 1</option>
//             <option value="Category 2">Category 2</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium">
//             League Name
//           </label>
//           <input
//             id="name"
//             {...register("name")}
//             placeholder="League name"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="url" className="block text-sm font-medium">
//             League URL
//           </label>
//           <input
//             id="url"
//             {...register("url")}
//             placeholder="League URL"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="redirect_urls" className="block text-sm font-medium">
//             Redirect URL(s)
//           </label>
//           <textarea
//             id="redirect_urls"
//             {...register("redirect_urls")}
//             placeholder="One URL per line. Don't put domain name."
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium">
//             League Image (1x49)
//           </label>
//           <input
//             type="file"
//             id="image"
//             {...register("image")}
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="show_on_menu" className="block text-sm font-medium">
//             Show on Menu
//           </label>
//           <select
//             id="show_on_menu"
//             {...register("show_on_menu")}
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           >
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="order" className="block text-sm font-medium">
//             Order
//           </label>
//           <input
//             id="order"
//             type="number"
//             {...register("order")}
//             placeholder="Order"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         {/* <div>
//           <label htmlFor="page_title" className="block text-sm font-medium">
//             Page Title
//           </label>
//           <input
//             id="page_title"
//             {...register("page_title")}
//             maxLength={60}
//           onChange={(e) => {
//             setTitleCount(e.target.value.length);
//             field.onChange(e);
//           }}
//             placeholder="Page Title"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div> */}


// <FormField
//   control={form.control}
//   name="page_title"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Page Title</FormLabel>
//       <FormControl>
//         <Input
//           {...field}
//           placeholder="Page Title"
//           maxLength={60}
//           onChange={(e) => {
//             setTitleCount(e.target.value.length);
//             field.onChange(e);
//           }}
//         />
//       </FormControl>
//       <p className="text-sm text-gray-500">{titleCount}/60</p>
//       <FormMessage />
//     </FormItem>
//   )}
// />




//         <div>
//           <label htmlFor="h1_title" className="block text-sm font-medium">
//             H1 Title
//           </label>
//           <input
//             id="h1_title"
//             {...register("h1_title")}
//             placeholder="H1 Title"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="meta_description"
//             className="block text-sm font-medium"
//           >
//             Meta Description
//           </label>
//           <textarea
//             id="meta_description"
//             {...register("meta_description")}
//             placeholder="Meta Description"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           ></textarea>
//         </div>
//         <div>
//           <label htmlFor="meta_keywords" className="block text-sm font-medium">
//             Meta Keywords
//           </label>
//           <input
//             id="meta_keywords"
//             {...register("meta_keywords")}
//             placeholder="Meta Keywords"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="page_content" className="block text-sm font-medium">
//             Page Content
//           </label>
//           <textarea
//             id="page_content"
//             {...register("page_content")}
//             placeholder="Page Content"
//             className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//         >
//           {loading ? "Creating..." : "Create League"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LeagueForm;


// -----------------------------------------------------------------------------------------------------------------------------
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

const LeagueForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/leagues`, {
        method: 'POST',
        ...API_CONFIG,
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create league');

      const result = await response.json();
      toast({
        title: "Success",
        description: "League created successfully",
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
                  <Input {...field} type="file" />
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
        <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Team"}
            </Button>
        </form>
      </Form>
      </CardContent>
    </Card>
  );
};

export default LeagueForm;
