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

type CategoryFormData = {
  name: string;
  seo_name: string;
  category_url: string;
  redirect_urls: string;
  category_image: File | null;
  show_on_menu: string;
  show_on_other_menus: string;
  order: number;
  page_title: string;
  meta_description: string;
  meta_keywords: string;
  page_content: string;
  category_duration: string;
};

const CategoryForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<CategoryFormData>();
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Category created successfully",
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
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Category Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category URL */}
            <FormField
              control={form.control}
              name="category_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Category URL" />
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
                      placeholder="One URL per line, don't include the domain name"
                      className="w-full h-20 p-2 border border-gray-300 rounded"
                    ></textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Duration */}
            <FormField
              control={form.control}
              name="category_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Category Duration" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Image */}
            <FormField
              control={form.control}
              name="category_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Image (49x49)</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" />
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
                  <FormLabel>Show Category on Other's Menu</FormLabel>
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
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;