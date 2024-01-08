'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { Categories } from '@/constants/Categories';
import SelectField from '../shared/SelectField';
import { PROGRAMMING_LANGUAGES } from '@/constants/programming_languages';
import { PASTE_EXPOSURE } from '@/constants/paste_exposure';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  category: z.string().min(2, {
    message: 'Choose proper category.',
  }),
  syntax: z.string().min(2, {
    message: 'Choose proper syntax.',
  }),
  exposure: z.string().min(2, {
    message: 'Choose proper exposure.',
  }),
  title: z.string().min(2, {
    message: 'Title must have at least 2 characters.',
  }),
  code: z
    .string()
    .min(2, {
      message: 'Title must have at least 2 characters.',
    })
    .optional(),
});

const PasteForm = ({ code }: { code?: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      syntax: '',
      exposure: '',
      title: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (values.exposure.toLowerCase().trim() === 'private' && !session) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You need to sign in to create a private paste',
      });
      return;
    }

    values = {
      ...values,
      code: code || '',
    };
    console.log('values', values);

    const response = await fetch(`/api/paste`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const parsedResponse = await response.json();

    if (response.ok) {
      toast({
        variant: 'default',
        title: 'Success',
        description: parsedResponse.message,
      });
    }
    router.push(
      `${process.env.NEXT_PUBLIC_URL}/paste/${parsedResponse.pasteId}`
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 space-y-6"
      >
        {/* Categories */}
        <SelectField
          control={form.control}
          items={Categories}
          placeholder="Select a category of paste"
          name="category"
          label="Category"
        />

        {/*Syntax Highlighting*/}
        <SelectField
          control={form.control}
          items={PROGRAMMING_LANGUAGES}
          placeholder="Select a language for syntax Highlighting"
          name="syntax"
          label="Syntax"
        />

        {/*Paste Exposure*/}
        <SelectField
          control={form.control}
          items={PASTE_EXPOSURE}
          placeholder="Select a paste exposure"
          name="exposure"
          label="Paste Exposure"
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paste Title</FormLabel>
              <FormControl>
                <Input placeholder="Paste Title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public paste title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PasteForm;
