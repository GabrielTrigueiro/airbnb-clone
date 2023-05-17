'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface ITripsClientProps{
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<ITripsClientProps> = ({reservations,currentUser}) => {
  
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled')
      router.refresh();
    })
    .catch((error: any) => {
      toast.error(error?.respose?.data?.error)
    })
    .then(() => {
      setDeletingId('');
    })
  },[router])
  
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where your've been and where you're going"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-8
        "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default TripsClient;