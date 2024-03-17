import { redirect  } from 'next/navigation'

import { getRide, getUncollectedRides } from "@/actions/rides";

export default async function CollectPage({params}: {params: {id: string}}) {
    // Get ride ID
    const id = parseInt(params.id);

    // Get ride
    const ride = await getRide(id);

    return <>
        Testing
    </>
}