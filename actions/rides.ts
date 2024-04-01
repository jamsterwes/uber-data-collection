"use server"

import { getLocations } from "./locations"
import { type Ride, type Location } from "@/data/db";
import db from "@/data/db";
import { revalidatePath } from "next/cache";

// Internal
var seed = 1;
function random(): number {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Keep random rides static
export const generateRides = async () => {
    // Step 1: Get locations
    const locations = await getLocations(1, 200);

    // Step 2: Shuffle
    seed = 402512;
    const shuffled = locations.map(value => ({ value, sort: random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    // Step 3: Starts & Ends
    const starts = shuffled.slice(0, 100);
    const ends = shuffled.slice(100, 200);

    // Step 4: Build ride data
    seed = 84812;
    const rides = starts.map((_, i) => ({
        id: i,
        start_latitude: starts[i].latitude,
        start_longitude: starts[i].longitude,
        end_latitude: ends[i].latitude,
        end_longitude: ends[i].longitude,
        collected: false,
        time: 0,
        distance: 0,
        price: 0
    }));

    // Fill in the TomTom data (?)
    for (let i = 0; i < rides.length; i++) {
        // ...
    }
    
    // Write ride data
    await db
        .insertInto('ride')
        .values(rides)
        .executeTakeFirstOrThrow();
}

// Randomly generate rides for now
export async function getRides(): Promise<Ride[]> {
    // Get rides from DB
    const rides: {
        start_latitude: any
        start_longitude: any
        end_latitude: any
        end_longitude: any
        collected: boolean
        time: any
        distance: any
        price: any
        id: number
    }[] = await db
        .selectFrom('ride')
        .selectAll()
        .execute();
    
    // Convert the numbers
    const converted = rides.map(ride => ({
        ...ride,
        start_latitude: parseFloat(ride.start_latitude),
        start_longitude: parseFloat(ride.start_longitude),
        end_latitude: parseFloat(ride.end_latitude),
        end_longitude: parseFloat(ride.end_longitude),
        time: parseFloat(ride.time ?? "0"),
        distance: parseFloat(ride.distance ?? "0"),
        price: parseFloat(ride.price ?? "0")
    }));

    return converted;
}

// Randomly generate rides for now
export async function getRide(id: number): Promise<Ride> {
    return (await getRides())[id];
}

// Get only uncollected rides:
export async function getUncollectedRides() {
    // Get rides
    const rides = await getRides();

    // Now get uncollected
    return rides.filter(ride => !ride.collected);
}

// Update ride
export async function updateRide(id: number, startCoordinate: string, endCoordinate: string,
    distance: number, startTime:string, travelTime:number, trafficDelay: number, historicTime: number,
    noTrafficTime: string, price: number) {
        
    // TODO: set that ride's time, distance, and set collected=true

    // TODO: invalidate stuff
}

// Update ride
export async function updateRideWithPrice(id: number, price: number) {
    // Set that ride's price
    await db
        .updateTable('ride')
        .where('id', '=', id)
        .set({
            price: price
        })
        .execute();
    
    // Revalidate dashboard (?)
    revalidatePath('/dashboard', 'page');
}