"use server"

import { getLocations } from "./locations"
import { type Ride, type Location } from "@/data/db";

// Internal
var seed = 1;
function random(): number {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Keep random rides static
const generateRides = async () => {
    // // Step 1: Get locations
    // const locations = await getLocations(0, 200);

    // // Step 2: Shuffle
    // seed = 402512;
    // const shuffled = locations.map(value => ({ value, sort: random() }))
    //     .sort((a, b) => a.sort - b.sort)
    //     .map(({ value }) => value);
    
    // // Step 3: Starts & Ends
    // const starts = shuffled.slice(0, 100);
    // const ends = shuffled.slice(100, 200);

    // // Step 4: Build ride data
    // seed = 84812;
    // const rides = starts.map((_, i) => ({
    //     id: i,
    //     start_latitude: starts[i].latitude,
    //     start_longitude: starts[i].longitude,
    //     end_latitude: ends[i].latitude,
    //     end_longitude: ends[i].longitude,
    //     collected: random() > 0.5,
    //     time: 0,
    //     distance: 0,
    //     price: 0
    // }));

    // // Return ride data
    // return rides;

    return []
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