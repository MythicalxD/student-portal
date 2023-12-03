"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal } from "../ui/modal";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface AlertModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [error, setError] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.name === title) {
      onConfirm(values.name);
      onClose();
    } else {
      setError(true);
    }
  }

  return (
    <Modal
      title="Are you sure?"
      description={`'${title}'`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={`Retype ${title} here`} {...field} />
                  </FormControl>
                  {error ? (
                    <FormDescription>The text do not match!</FormDescription>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex pt-6 space-x-2 items-center justify-end w-full">
              <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} variant="destructive" type="submit">
                Delete
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
