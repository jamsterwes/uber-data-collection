"use server";

import locations from "@/data/locations"

export async function getLocations(start: number = 0, maxCount: number = 100) {
    // Return data
    return locations.slice(start, maxCount);
}