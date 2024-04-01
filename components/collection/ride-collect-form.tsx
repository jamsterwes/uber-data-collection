"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { MobileIcon } from "@radix-ui/react-icons";

import { type Ride } from "@/data/db";
import { updateRideWithPrice } from "@/actions/rides";
import { useState } from "react";

export function RideCollectForm(props: { ride: Ride }) {
    // State for price
    const [price, setPrice] = useState<number>(0);

    // Form
    return (<>
        <div className="flex flex-col gap-2 items-center mb-4">
            <h2 className="text-xl font-bold">
                Ride ID:&nbsp;&nbsp;
                <span className="font-mono">{props.ride.id}</span>
            </h2>
            <h2 className="text-xl font-bold">
                Start Location:&nbsp;&nbsp;
                <span className="font-mono">
                    {props.ride.start_latitude.toFixed(4)}, {props.ride.start_longitude.toFixed(4)}
                </span>
            </h2>
            <h2 className="text-xl font-bold">
                End Location:&nbsp;&nbsp;
                <span className="font-mono">
                    {props.ride.end_latitude.toFixed(4)}, {props.ride.end_longitude.toFixed(4)}
                </span>
            </h2>
            <h2 className="text-xl font-bold">
                Time:&nbsp;&nbsp;
                <span className="font-normal">
                    {props.ride.time} min
                </span>
            </h2>
            <h2 className="text-xl font-bold">
                Distance:&nbsp;&nbsp;
                <span className="font-normal">
                    {props.ride.distance} mi
                </span>
            </h2>
            <Separator className="mb-4" />
            <div className="flex gap-2">
                <a target="_blank" href={`uber://?action=setPickup&client_id=W9IJVfDtraQeCVxSeWFYfxtpE2InanIl&pickup[latitude]=${props.ride.start_latitude}&pickup[longitude]=${props.ride.start_longitude}&dropoff[latitude]=${props.ride.end_latitude}&dropoff[longitude]=${props.ride.end_longitude}`}>
                    <Button className="w-fit font-bold" variant="secondary">
                        <MobileIcon className="mr-1" />
                        Open in Uber
                    </Button>
                </a>
            </div>
            <Separator className="mb-4" />
        </div>

        <div className="flex flex-col gap-2 w-4/5 mx-auto">
            <small>Price (in $)</small>
            <Input type="number" placeholder="0.00" value={price} onChange={e => setPrice(parseFloat(e.target.value))}></Input>
            <Button onClick={() => updateRideWithPrice(props.ride.id, price)} className="w-48 mx-auto">Submit</Button>
        </div>
    </>)
}