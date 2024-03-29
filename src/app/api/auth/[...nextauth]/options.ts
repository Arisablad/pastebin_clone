import CredentialsProvider from 'next-auth/providers/credentials';
import { DbConnect } from '@/lib/DbConnection';
import { User } from '@/models/MongoModels/UserModel';
import bcrypt from "bcrypt"
import { NextAuthOptions } from 'next-auth';

interface JwtFunctionArguments {
    token: {
      username: string;
      email: string;
      id: string;
    };
    user: IUser;
  }
  
  interface IUser  {
    username: string;
    email: string;
    id: string;
  }
  
  interface SessionFunctionArguments {
    session: {
      user: {
        username: string;
        email: string;
        id: string;
      };
    };
    token: {
      username: string;
      email: string;
      id: string;
    };
  }
  
  interface Credentials {
    username: string;
    password: string;
  }
  
  
  async function login (credentials: Credentials) {
  try{
    await DbConnect()
    const user = await User.findOne({username: credentials.username})
    if(!user){
      throw new Error("wrong credentials")
    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
    if(!isPasswordCorrect){
      throw new Error("You need to provide correct password");
    }
    return user
  }
  catch(error){
    console.log("error while logging in", error);
    throw new Error("something went wrong")
  }
  }

export const authOptions :NextAuthOptions = {
    pages:{
      signIn: "/sign-in",
      signOut: "/sign-out"
    },
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: 'Credentials',
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {},
        async authorize(credentials, req:any) {
         // WHERE TO NAVIGATE USER IN CASE THEY're not loged in
          // Add logic here to look up the user from the credentials supplied
          try {
            if(credentials){
            const user = "" || await login(credentials as Credentials);
            return user
            }
          } catch (error) {
            throw new Error("Failed to login", error as ErrorOptions);
          }
        },
      }),
    ],
    callbacks:{
      async jwt({token, user}:any){
        if(user){
          token.name = user.username
          token.email = user.email
          token.id = user.id
        }
        return token
      },
      async session({session, token}:any){
        if(token){
          session.user.name = token.name
          session.user.email = token.email
          session.user.id = token.id
        }
        return session
      }
    }
  };