import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"

export async function POST(request: Request){

  const body = await request.json();

  const {email, name, password} = body;

  //traduzir a senha
  const hashedPassword = await bcrypt.hash(password, 12);

  //relacionando a req com o objeto user no banco de dados
  const user = await prisma.user.create({
    data:{
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user)
}