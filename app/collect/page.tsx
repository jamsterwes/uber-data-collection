import { redirect  } from 'next/navigation'

import { getUncollectedRides } from "@/actions/rides";

export default async function CollectHomePage() {
    // Get rides
    const uncollectedRides = await getUncollectedRides();

    // If empty, go to empty
    if (uncollectedRides.length === 0) {
        return redirect("/collect/empty")
    }

    // Get random ride
    const randomRide = uncollectedRides[Math.floor(Math.random() * (uncollectedRides.length - 1))];

    // Now route to ID
    redirect(`/collect/${randomRide.id}`)
}