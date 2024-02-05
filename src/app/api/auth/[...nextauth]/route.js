import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

async function login(credentials) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select(`user_id, email,password, user_profiles(first_name,last_name)`)
      .eq("email", credentials.email);

    if (!users[0]) {
      throw new Error("wrong credentials");
    }

    const isValidPassword = await bcrypt.compare(
      credentials.password,
      users[0].password
    );

    if (!isValidPassword) {
      throw new Error("wrong credentials");
    }

    return users[0];
  } catch (error) {
    throw new Error("something went wrong");
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your username or email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          return user;
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.user_id;
        token.email = user.email;
        token.firstName = user.user_profiles[0].first_name;
        token.lastName = user.user_profiles[0].last_name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
