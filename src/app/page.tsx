"use client";
import { FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";

const formSchema = zod.object({
  emailAddress: zod.string().email(),
  message: zod.string().min(20),
});

export default function Home() {
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      message: "",
    },
  });

  const handleSubmit = (values: zod.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className="flex min-h-screen bg-slate-900 flex-col items-center justify-center gap-y-3 h-full">
      <h1 className="text-white font-bold font-sans text-2xl ">Contact Us</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-80 w-full gap-y-4 flex flex-col  items-center justify-center p-4 bg-white shadow-xl shadow-black rounded-md"
        >
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      rows={5}
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              );
            }}
          />
          <button
            className="bg-slate-900 text-white rounded-md p-2 px-4 hover:bg-slate-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Form>
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Shop</p>
      </div>
    </main>
  );
}
