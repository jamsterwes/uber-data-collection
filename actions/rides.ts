"use server"

import { getLocations } from "./locations"
import { Location } from "@/data/locations";

export interface Ride {
    id: number;
    start: Location;
    end: Location;
    collected: boolean;
    time?: number;
    distance?: number;
}

// Randomly generate rides for now
export async function getRides(): Promise<Ride[]> {
    // Step 1: Get locations
    const locations = await getLocations(0, 200);

    // Step 2: Shuffle
    const shuffled = locations.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    // Step 3: Starts & Ends
    const starts = shuffled.slice(0, 100);
    const ends = shuffled.slice(100, 200);

    // Step 4: Build ride data
    const rides = starts.map((_, i) => ({
        id: i,
        start: starts[i],
        end: ends[i],
        collected: Math.random() > 0.5
    }));

    // Return ride data
    return rides;
}