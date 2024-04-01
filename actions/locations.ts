"use server";

import { parse } from "csv-parse/sync"
import db, { type Location } from "@/data/db"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";

// export async function getLocations(start: number = 0, maxCount: number = 100) {
//     // Return data
//     return locations.slice(start, maxCount);
// }

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        return {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
    });

    console.log(locations);

    // Delete all previous rows
    await db
        .deleteFrom('location')
        .execute();

    // Now upload locations (in chunks of 100)
    const CHUNK_SIZE = 100
    for (var i = 0; i < ((locations.length + CHUNK_SIZE - 1) / CHUNK_SIZE); i++) {
        try {
            console.log(`Uploading rows ${1 + i * CHUNK_SIZE} to ${1 + Math.min((i + 1) * CHUNK_SIZE)}`);
            await db
                .insertInto('location')
                .values(locations.slice(i * CHUNK_SIZE, Math.min((i + 1) * CHUNK_SIZE, locations.length)))
                .executeTakeFirstOrThrow();
            await sleep(50);
        } catch (e) {
            console.error(e);
        }
    }
}

// Get locations
// TODO: pagination
export async function getLocations(start: number = 1, maxCount: number = 100): Promise<Location[]> {
    const locs: { id: number, longitude: any, latitude: any }[] = await db
        .selectFrom('location')
        .select(['id', 'longitude', 'latitude'])
        .where('id', '>=', start)
        .orderBy('id asc')
        .limit(maxCount)
        .execute();
    
    const converted = locs.map(loc => ({
        id: loc.id,
        longitude: parseFloat(loc.longitude),
        latitude: parseFloat(loc.latitude)
    }));

    return converted;
}