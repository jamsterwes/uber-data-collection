import { createKysely } from '@vercel/postgres-kysely';
import * as pg from 'pg';

import {
    Generated,
    Insertable,
    Selectable,
    Updateable
  } from 'kysely'

export interface Database {
    location: LocationTable
    ride: RideTable
}

export interface LocationTable {
    id: Generated<number>
    latitude: number
    longitude: number
}

export interface RideTable {
    id: Generated<number>
    start_latitude: number
    start_longitude: number
    end_latitude: number
    end_longitude: number
    collected: boolean
    time: number | null
    start_time: Date | null
    traffic_delay: number | null
    historic_time: number | null
    no_traffic_time: number | null
    distance: number | null
    price: number | null
}

// Location exports
export type Location = Selectable<LocationTable>
export type NewLocation = Insertable<LocationTable>

// Ride exports
export type Ride = Selectable<RideTable>
export type NewRide = Insertable<RideTable>
export type RideUpdate = Updateable<RideTable>

// Export db
const db = createKysely<Database>()
export default db
