import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization:{
        params:{
          prompt:'select_account'// let's you choose an account on each sign in attempt
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization:{
        params:{
          prompt:'select_account'// let's you choose an account on each sign in attempt
        }
      }
    })
  ],
});
export {handler as GET, handler as POST}