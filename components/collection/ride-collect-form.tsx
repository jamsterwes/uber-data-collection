"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { updateRideWithPrice } from "@/actions/rides"
import { MobileIcon } from "@radix-ui/react-icons";

import { type Ride } from "@/data/db";

const formSchema = z.object({
    price: z.coerce.number().gte(0)
})

export function RideCollectForm(props: { ride: Ride }) {
    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0
        }
    })

    // Define submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Update ride with its price
        updateRideWithPrice(props.ride.id, values.price);
    }

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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-2 md:px-0 md:w-3/5 mx-auto">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (in $)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="font-bold w-full">Submit</Button>
            </form>
        </Form>
    </>)
}