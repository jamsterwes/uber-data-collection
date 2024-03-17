"use server";

import locations from "@/data/locations"

import { parse } from "csv-parse/sync"

export async function getLocations(start: number = 0, maxCount: number = 100) {
    // Return data
    return locations.slice(start, maxCount);
}

export async function uploadLocations(data: FormData) {
    // Get the file of locations
    const csvFile = data.get("csvFile") as File;

    // Get location data
    const locationDataText = await csvFile.text();

    // Parse CSV
    const records = parse(locationDataText, {
        columns: true
    });
    const locations: Location[] = records.map(({id, latitude, longitude}: {
        id: string,
        latitude: string,
        longitude: string
    }) => {
        return {id: BigInt(id), latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
    });

    // Print a location
    console.log(locations[0]);
}