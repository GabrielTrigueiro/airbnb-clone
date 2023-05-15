'use client'

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useMemo } from "react";
import ListingInfo from "./ListingInfo";

interface IListingClientProps {
  listing: SafeListing & { user: SafeUser };
  reservation?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<IListingClientProps> = ({ listing, currentUser, reservation }) => {

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screemn-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;