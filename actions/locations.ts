"use server";

import locations from "@/data/locations"

export async function getLocations(start: number = 0, maxCount: number = 100) {
    // Return data
    return locations.slice(start, maxCount);
}

export async function uploadLocations(data: FormData) {
    // Get the file of locations
    const csvFile = data.get("csvFile") as File;

    // Print location data
    const locationData = await csvFile.text();
    console.log(locationData.slice(0, 50));
}