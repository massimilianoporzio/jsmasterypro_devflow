/*
 *   Copyright (c) 2026 Massimiliano Porzio
 *   All rights reserved.
 */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});
