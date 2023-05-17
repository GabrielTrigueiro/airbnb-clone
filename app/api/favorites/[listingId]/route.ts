import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import client from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function POST(
  //tipando a param
  request: Request,
  {params}: {params: IParams}
) {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  }

  //armazenando o id vido da params
  const {listingId} = params;

  console.log(listingId);

  //verificando se a lista possui um id e se tiver qual seu tipo
  if(!listingId || typeof listingId !== 'string'){
    throw new Error('Invalid ID')
  }

  //pegando ids favoritos do usuário
  let favoriteIds = [...(currentUser.favoriteIds || [])]

  //adiciona o id do card respectivo
  favoriteIds.push(listingId);

  //atualiza user atual no banco de dados
  const user = await client.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds: favoriteIds
    }
  })

  return NextResponse.json(user);
};

//remover dos favoritos
export async function DELETE(
  request: Request,
  {params}: {params: IParams}
){
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return NextResponse.error();
  };

  const {listingId} = params;

  if(!listingId || typeof listingId !== 'string'){
    throw new Error('Invalid ID');
  };

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await client.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds: favoriteIds
    }
  })
  return NextResponse.json(user);
}