import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { supabase } from "@/utils/db";
import bcrypt from "bcrypt";

async function login(credentials) {
  if (credentials.role === "user") {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select(
          `user_id, email,password, user_profiles(first_name,last_name,img_url)`
        )
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

      const data = {
        ...users[0],
        role: "user",
      };

      return data;
    } catch (error) {
      throw new Error("something went wrong");
    }
  }

  if (credentials.role === "admin") {
    try {
      const { data: users, error } = await supabase
        .from("admins")
        .select("*")
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

      const data = {
        ...users[0],
        role: "admin",
      };

      return data;
    } catch (error) {
      throw new Error("something went wrong");
    }
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
        role: {
          label: "user",
          type: "text",
          placeholder: "Enter your role",
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.role === "user") {
          token.userId = user.user_id;
          token.email = user.email;
          token.firstName = user.user_profiles[0].first_name;
          token.lastName = user.user_profiles[0].last_name;
          token.url = user.user_profiles[0].img_url;
          token.role = user.role;
        }
        if (user.role === "admin") {
          token.adminId = user.admin_id;
          token.role = user.role;
        }
      }

      if (trigger == "update") {
        return { ...token, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        if (token.role === "user") {
          session.user.userId = token.userId;
          session.user.email = token.email;
          session.user.firstName = token.firstName;
          session.user.lastName = token.lastName;
          session.user.url = token.url;
          session.user.role = token.role;
        }

        if (token.role === "admin") {
          session.user.adminId = token.adminId;
          session.user.role = token.role;
        }
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
