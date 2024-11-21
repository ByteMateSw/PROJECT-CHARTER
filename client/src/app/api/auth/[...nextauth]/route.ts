import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { googleLogin, googleAccountVerify } from "../../user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res: any = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // if (res.error) throw res;

        return res.data;
      },
    }),
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if(account){
        token.provider = account.provider
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async signIn({user, account, profile}) {
      const data = {name: user.name as string, email: user.email as string}
      const verify:any = await googleAccountVerify(user.email as string)
      console.log('user', verify.data)
        if(verify.data) {
          if(verify.data.provider === 'credential') {
            return false;
          }
          return true
        } 
        await googleLogin(data)
        return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
