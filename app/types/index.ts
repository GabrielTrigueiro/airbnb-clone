import { User } from "@prisma/client";

//um tipo que omite essas três propriedades e transformam elas em string e não dateTime
export type safeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}