'use client';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Choose proper username at least 3 characters.',
    })
    .max(30, { message: 'Choose proper username, max 30 characters.' }),
  email: z
    .string()
    .min(5, {
      message: 'Choose proper email 5 characters.',
    })
    .max(40, { message: 'Choose proper email, max 40 characters.' }),
  password: z
    .string()
    .min(6, {
      message: 'Choose proper password. Min 6 characters',
    })
    .max(30, { message: 'Choose proper password, max 30 characters.' }),
});

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('values sign up');

    const response = fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  }

  return (
    <div className="bg-[#F9FAFB] mt-24 flex items-center">
      <div className="h-max mx-auto flex flex-col items-center">
        LOGO
        <h1 className="text-xl font-bold text-center pb-10">
          Sign up to your account
        </h1>
        <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm w-full"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>{/**/}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>{/**/}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="password" {...field} />
                    </FormControl>
                    <FormDescription>{/**/}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className={
                  'bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]'
                }
              >
                {' '}
                Sign up
              </Button>
            </form>
            {/* <div className="flex">
              <div className="w-1/2">
                <input type="checkbox" name="remeberMe" />
                <label htmlFor="remeberMe">Remeber me</label>
              </div>
              <div className="w-1/2">
                <span
                  className="font-bold text-blue-600 cursor-pointer"
                  onClick={() => {
                    //   toast({
                    //     variant: 'destructive',
                    //     description: `Function Will be implemented soon`,
                    //   });
                  }}
                >
                  Forgot password ?
                </span>
              </div>
            </div>

            <div>
              <p className="text-center">Or continue with</p>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-[#1D9BF0] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                onClick={() => {
                  // toast({
                  //   variant: 'destructive',
                  //   description: `Function Will be implemented soon`,
                  // });
                }}
              >
                Twitter
              </button>
              <button
                className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                onClick={() => {
                  // toast({
                  //   variant: 'destructive',
                  //   description: `Function Will be implemented soon`,
                  // });
                }}
              >
                Github
              </button>
            </div> */}
            <p className="text-sm text-gray-500 mt-10">
              Already have account?{' '}
              <Link href="/sign-in" className="text-[#4F46E5] font-bold">
                Login here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
