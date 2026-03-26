import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const password = process.env.DASHBOARD_PASSWORD;

        if (!password) {
          throw new Error("DASHBOARD_PASSWORD is not configured");
        }

        if (credentials?.password === password) {
          return { id: "1", name: "Owner", email: "owner@localhost" };
        }

        throw new Error("Invalid password");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
