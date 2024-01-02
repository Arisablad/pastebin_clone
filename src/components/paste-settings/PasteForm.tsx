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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Categories } from '@/constants/Categories';
import SelectField from '../shared/SelectField';
import { PROGRAMMING_LANGUAGES } from '@/constants/programming_languages';
import { PASTE_EXPOSURE } from '@/constants/paste_exposure';
import { Input } from '../ui/input';

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
  code: z.string().min(5, {
    message: 'Paste must have at least 5 characters.',
  }),
  userId: z.string().min(2, {
    message: 'Paste must have at least 2 characters.',
  }),
});

const PasteForm = ({ code }: { code?: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      syntax: '',
      exposure: '',
      title: '',
      code: code,
      userId: 'Anonymous',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // ...

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
