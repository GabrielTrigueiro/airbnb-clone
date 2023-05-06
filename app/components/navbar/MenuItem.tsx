'use client'

interface IMenuItemProps{
  onClick:()=>void
  label:string
}

const MenuItem = ({label, onClick}: IMenuItemProps) => {

  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      "
    >
      {label}
    </div>
  )
}

export default MenuItem