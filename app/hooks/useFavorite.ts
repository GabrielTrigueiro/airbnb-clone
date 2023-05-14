import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavoriteProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({listingId,currentUser}: IUseFavoriteProps) => {

  const router = useRouter()
  const loginModal = useLoginModal();

  //dispara toda vez que as depedencias mudam de valor
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);//retorna boolean se tiver ou não o id
  },[listingId, currentUser])


  const toggleFavorite = useCallback(async(event: React.MouseEvent<HTMLDivElement>) =>{
    event.stopPropagation();
    //sem login abre modal de login
    if(!currentUser){
      return loginModal.onOpen();
    }

    //favorita caso já esteja nos favoritos, remove
    try{
      let request;
      if(hasFavorited){
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }
      await request();
      router.refresh();
      toast.success('Sucess');
    } catch{
      toast.error('Something went wrong.');
    }
  },[listingId, currentUser, router, hasFavorited, loginModal]);

  return{
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite;