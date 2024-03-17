"use server";

export interface Location {
    id: bigint;
    latitude: number;
    longitude: number;
}

export async function getLocations() {
    // For now: return some fake data...
    const fakeData: Location[] = [
        {id: BigInt(151382797), latitude: 30.6549201, longitude: -96.2752386},
        {id: BigInt(151461194), latitude: 30.6743643, longitude: -96.3699632},
        {id: BigInt(151463830), latitude: 30.6711313, longitude: -96.3247057},
        {id: BigInt(151495391), latitude: 30.6183939, longitude: -96.3455991},
        {id: BigInt(151579002), latitude: 30.5724234, longitude: -96.3263510}
    ]

    // Return data
    return fakeData;
}