// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { formStyles } from "@/styles/formStyles";

// const MatchForm = () => {
//   const [formData, setFormData] = useState({
//     match: "",
//     link: "",
//     channel: "",
//     ads: "",
//     language: "",
//     quality: "HD",
//     mobile: "Yes",
//     nsfw: "Yes",
//     adBlock: "Yes"
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={formStyles.form}>
//       <div className={formStyles.formWrapper}>
//         <div className={formStyles.container}>
//           {/* Match Selection */}
//           <div className="space-y-2">
//             <Label htmlFor="match" className={formStyles.label}>Match*</Label>
//             <Select
//               value={formData.match}
//               onValueChange={(value) => setFormData({ ...formData, match: value })}
//             >
//               <SelectTrigger className={formStyles.select}>
//                 <SelectValue placeholder="Select Match" />
//               </SelectTrigger>
//               <SelectContent className="bg-white">
//                 <SelectItem value="detroit-gsw">Detroit Pistons vs Golden State Warriors ( 2025-01-10 00:00 )</SelectItem>
//                 <SelectItem value="hawks-rockets">Atlanta Hawks vs Houston Rockets ( 2025-01-11 20:00 )</SelectItem>
//                 <SelectItem value="suns-jazz">Phoenix Suns vs Utah Jazz ( 2025-01-11 22:00 )</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Link */}
//           <div className="space-y-2">
//             <Label htmlFor="link" className={formStyles.label}>Link*</Label>
//             <Input
//               id="link"
//               value={formData.link}
//               onChange={(e) => setFormData({ ...formData, link: e.target.value })}
//               className={formStyles.input}
//             />
//           </div>

//           {/* Channel */}
//           <div className="space-y-2">
//             <Label htmlFor="channel" className={formStyles.label}>Channel*</Label>
//             <Input
//               id="channel"
//               value={formData.channel}
//               onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
//               className={formStyles.input}
//             />
//           </div>

//           {/* Ads */}
//           <div className="space-y-2">
//             <Label htmlFor="ads" className={formStyles.label}>Ads*</Label>
//             <Input
//               id="ads"
//               value={formData.ads}
//               onChange={(e) => setFormData({ ...formData, ads: e.target.value })}
//               className={formStyles.input}
//             />
//           </div>

//           {/* Language */}
//           <div className="space-y-2">
//             <Label htmlFor="language" className={formStyles.label}>Language*</Label>
//             <Input
//               id="language"
//               value={formData.language}
//               onChange={(e) => setFormData({ ...formData, language: e.target.value })}
//               className={formStyles.input}
//             />
//           </div>

//           {/* Quality */}
//           <div className="space-y-2">
//             <Label className={formStyles.label}>Quality</Label>
//             <RadioGroup
//               value={formData.quality}
//               onValueChange={(value) => setFormData({ ...formData, quality: value })}
//               className={formStyles.radioGroup}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="HD" id="hd" className={formStyles.radioItem} />
//                 <Label htmlFor="hd" className={formStyles.label}>HD</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="SD" id="sd" className={formStyles.radioItem} />
//                 <Label htmlFor="sd" className={formStyles.label}>SD</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Mobile */}
//           <div className="space-y-2">
//             <Label className={formStyles.label}>Mobile</Label>
//             <RadioGroup
//               value={formData.mobile}
//               onValueChange={(value) => setFormData({ ...formData, mobile: value })}
//               className={formStyles.radioGroup}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="Yes" id="mobile-yes" className={formStyles.radioItem} />
//                 <Label htmlFor="mobile-yes" className={formStyles.label}>Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="No" id="mobile-no" className={formStyles.radioItem} />
//                 <Label htmlFor="mobile-no" className={formStyles.label}>No</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* NSFW */}
//           <div className="space-y-2">
//             <Label className={formStyles.label}>NSFW</Label>
//             <RadioGroup
//               value={formData.nsfw}
//               onValueChange={(value) => setFormData({ ...formData, nsfw: value })}
//               className={formStyles.radioGroup}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="Yes" id="nsfw-yes" className={formStyles.radioItem} />
//                 <Label htmlFor="nsfw-yes" className={formStyles.label}>Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="No" id="nsfw-no" className={formStyles.radioItem} />
//                 <Label htmlFor="nsfw-no" className={formStyles.label}>No</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Ad Block */}
//           <div className="space-y-2">
//             <Label className={formStyles.label}>Ad Block</Label>
//             <RadioGroup
//               value={formData.adBlock}
//               onValueChange={(value) => setFormData({ ...formData, adBlock: value })}
//               className={formStyles.radioGroup}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="Yes" id="adblock-yes" className={formStyles.radioItem} />
//                 <Label htmlFor="adblock-yes" className={formStyles.label}>Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="No" id="adblock-no" className={formStyles.radioItem} />
//                 <Label htmlFor="adblock-no" className={formStyles.label}>No</Label>
//               </div>
//             </RadioGroup>
//           </div>
//         </div>
//         <Button type="submit" className={formStyles.submitButton}>
//           ADD
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default MatchForm; 






import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Define form data type
type MatchFormData = {
  match: string;
  link: string;
  channel: string;
  ads: string;
  language: string;
  quality: string;
  mobile: string;
  nsfw: string;
  adBlock: string;
};

const MatchForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<MatchFormData>();

  const onSubmit = async (data: MatchFormData) => {
    setLoading(true);
    try {
      console.log(data);
      toast({
        title: "Success",
        description: "Match added successfully",
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
        <CardTitle>Add Match</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Match */}
            <FormField
              control={form.control}
              name="match"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Match" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detroit-gsw">Detroit Pistons vs Golden State Warriors (2025-01-10 00:00)</SelectItem>
                        <SelectItem value="hawks-rockets">Atlanta Hawks vs Houston Rockets (2025-01-11 20:00)</SelectItem>
                        <SelectItem value="suns-jazz">Phoenix Suns vs Utah Jazz (2025-01-11 22:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Channel */}
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter channel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ads */}
            <FormField
              control={form.control}
              name="ads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ads</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter ads info" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter language" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quality */}
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="HD" />
                          <FormLabel>HD</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="SD" />
                          <FormLabel>SD</FormLabel>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" />
                          <FormLabel>Yes</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" />
                          <FormLabel>No</FormLabel>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NSFW */}
            <FormField
              control={form.control}
              name="nsfw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NSFW</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" />
                          <FormLabel>Yes</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" />
                          <FormLabel>No</FormLabel>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ad Block */}
            <FormField
              control={form.control}
              name="adBlock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Block</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" />
                          <FormLabel>Yes</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" />
                          <FormLabel>No</FormLabel>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Add Match"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MatchForm;
