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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Choose proper username at least 3 characters.',
    })
    .max(30, { message: 'Choose proper username, max 30 characters.' }),
  password: z
    .string()
    .min(6, {
      message: 'Choose proper password. Min 6 characters',
    })
    .max(30, { message: 'Choose proper password, max 30 characters.' }),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });
      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error something went wrong',
          description: response.error || 'Unknown error',
        });
        return;
      }

      toast({
        variant: 'default',
        title: 'Login successfully',
        description: 'redirecting to home page',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error something went wrong',
        description:
          (error as { message?: string })?.message || 'Unknown error',
      });
    }
  }

  return (
    <div className="bg-transparent mt-24 flex items-center">
      <div className="h-max mx-auto flex flex-col items-center">
        <p className="text-2xl font-mono font-bold tracking-wide">PASTENOTE</p>
        <h1 className="text-xl font-bold text-center pb-10">
          Sign in to your account
        </h1>
        <div className="bg-secondary shadow-xl p-10 flex flex-col gap-4 text-sm ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-secondary shadow-xl p-10 flex flex-col gap-4 text-sm w-full"
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
                Sign in
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
              Not a member?{' '}
              <Link href="/sign-up" className="text-[#4F46E5] font-bold">
                Register here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
