import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismaDb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {

    const session = await getSession();

    if(!session?.user?.email){
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where:{
        email: session.user.email as string
      }
    })

  } catch (error: any) {
    return null;
  }
}