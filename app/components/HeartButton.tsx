'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface IHeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<IHeartButtonProps> = ({ listingId, currentUser }) => {

  const hasFavorite = false;
  const toggleFavorite = () => {

  }

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        //absolute usado para deixar o icon outlined por cima do preenchido
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
}

export default HeartButton;