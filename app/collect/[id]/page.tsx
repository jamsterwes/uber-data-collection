import { redirect  } from 'next/navigation'

import { getRide, getUncollectedRides } from "@/actions/rides";
import { RideCollectForm } from '@/components/collection/ride-collect-form';

export default async function CollectPage({params}: {params: {id: string}}) {
    // Get ride ID
    const id = parseInt(params.id);

    // Get ride
    const ride = await getRide(id);

    return <div className="w-full px-2 md:px-0 md:w-[90%] mx-auto py-2 md:py-8">
        <RideCollectForm ride={ride} />
    </div>
}