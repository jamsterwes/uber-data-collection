import { redirect  } from 'next/navigation'

import { getUncollectedRides } from "@/actions/rides";

export default async function CollectHomePage() {
    // Get random ride
    const uncollectedRides = await getUncollectedRides();
    const randomRide = uncollectedRides[Math.floor(Math.random() * (uncollectedRides.length - 1))];

    // Now route to ID
    redirect(`/collect/${randomRide.id}`)
}