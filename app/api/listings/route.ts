import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/api/actions/getCurrentUser";
import { toast } from "react-hot-toast";

export async function POST(request: Request) {

  const currentUser = await getCurrentUser();

  //caso não haja usuário logado
  if (!currentUser){
    return toast.error('User not logged.')
  }

  //extraindo o body da req
  const body = await request.json();
  //extraindo os campos necessários
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price
  } = body;

  //checar se algum campo está faltando
  Object.keys(body).forEach((value: any) => {
    if(!body[value]){
      return toast.error('Please fill all steps.')
    }
  })

  //criando a lista
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  })
  return NextResponse.json(listing);
}