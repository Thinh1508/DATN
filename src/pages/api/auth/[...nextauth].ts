import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import connectMongo from "@/database/conn"
import Users from "@/model/Users"
import { IUser } from "@/types"

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo().catch((err) => {
          throw new Error(err)
        })

        const user = await Users.findOne({
          email: credentials?.email,
        }).select("+password")

        if (!user) throw new Error("Invalid credentials")

        if (user.password !== credentials?.password)
          throw new Error("Invalid credentials")

        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser
      session.user = user
      return session
    },
  },
}
export default NextAuth(options)
