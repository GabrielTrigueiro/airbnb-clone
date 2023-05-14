'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface IEmptySpace {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<IEmptySpace> = ({
  showReset,
  subtitle = "Try changing or removing some of your filters",
  title = "No exact matches"
}) => {

  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}//remove todos os filtros da url
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;