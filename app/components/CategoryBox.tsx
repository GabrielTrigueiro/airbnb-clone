'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";
import qs from 'query-string'

interface ICategoryBoxProps {
  label: string;
  selected?: boolean;
  icon: IconType
}
const CategoryBox: React.FC<ICategoryBoxProps> = ({ selected, icon: Icon, label }) => {
  
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuerry = {};
    //params da url armazenados
    if(params){
      currentQuerry = qs.parse(params.toString());
    }
    //spread a query e adiciona a cateogoria com sua label
    const updatedQuery: any = {
      ...currentQuerry,
      category: label
    }
    //checa se a nova categoria já está selecionada e remove da query atualizada
    if(params?.get('category') === label){
      delete updatedQuery.category;
    }
    //gera uma url onde passa o / e a nova querry
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull: true})
    router.push(url);
  }, [label, params, router])
  
  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-content
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
}

export default CategoryBox;