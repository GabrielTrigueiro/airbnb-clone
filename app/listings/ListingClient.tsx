'use client'

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";

import Container from "app/components/Container";
import ListingHead from "app/components/listing/ListingHead";
import { categories } from "app/components/navbar/Categories";
import { SafeListing, SafeReservation, SafeUser } from "app/types";
import ListingInfo from "./ListingInfo";
import useLoginModal from "../hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface IListingClientProps {
  listing: SafeListing & { user: SafeUser };
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
};

const ListingClient: React.FC<IListingClientProps> = ({ listing, currentUser, reservations = [] }) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = useMemo(() => {

    let dates: Date[] = [];

    reservations.forEach((reservation) => {

      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() =>{
    if(!currentUser){
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('listing reserved!');
      setDateRange(initialDateRange);
      router.push('/trips');
    })
    .catch(() => {
      toast.error('Something when wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    })
  },[loginModal, totalPrice, dateRange, listing?.id, router, currentUser])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }

  },[dateRange, listing?.price])

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
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;