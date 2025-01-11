import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type LeagueFormData = {
  name: string;
  logo_url: string;
};

const LeagueForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<LeagueFormData>();

  const onSubmit = async (data: LeagueFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("leagues").insert([data]);
      if (error) throw error;
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
        <CardTitle>Create League</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="League name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Logo URL" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create League"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LeagueForm;