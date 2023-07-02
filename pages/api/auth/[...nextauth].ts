import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email@teslo.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
};
export default NextAuth(authOptions);
