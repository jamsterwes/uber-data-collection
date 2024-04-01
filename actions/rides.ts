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
    price?: number;
}

// Internal
var seed = 1;
function random(): number {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Keep random rides static
const generateRides = async () => {
    // Step 1: Get locations
    const locations = await getLocations(0, 200);

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
        start: starts[i],
        end: ends[i],
        collected: random() > 0.5,
        time: 0,
        distance: 0,
        price: 0
    }));

    // Return ride data
    return rides;
}

// Randomly generate rides for now
export async function getRides(): Promise<Ride[]> {
    return await generateRides();
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