"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Ride, updateRide } from "@/actions/rides"
import { MobileIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
    time: z.coerce.number().gte(0),
    distance: z.coerce.number().gte(0),
    price: z.coerce.number().gte(0)
})

export function RideCollectForm(props: { ride: Ride }) {
    // Define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: 0,
            distance: 0,
            price: 0
        }
    })

    // Define submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Update ride
        updateRide(props.ride.id, values.time, values.distance, values.price)

        // ...
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
                    {props.ride.start.latitude.toFixed(4)}, {props.ride.start.longitude.toFixed(4)}
                </span>
            </h2>
            <h2 className="text-xl font-bold">
                End Location:&nbsp;&nbsp;
                <span className="font-mono">
                    {props.ride.end.latitude.toFixed(4)}, {props.ride.end.longitude.toFixed(4)}
                </span>
            </h2>
            <div className="flex gap-2">
                <a target="_blank" href={`uber://?action=setPickup&client_id=W9IJVfDtraQeCVxSeWFYfxtpE2InanIl&pickup[latitude]=${props.ride.start.latitude}&pickup[longitude]=${props.ride.start.longitude}&dropoff[latitude]=${props.ride.end.latitude}&dropoff[longitude]=${props.ride.end.longitude}`}>
                    <Button className="w-fit font-bold" variant="secondary">
                        <MobileIcon className="mr-1" />
                        Open in Uber
                    </Button>
                </a>
                <a target="_blank" href={`https://www.google.com/maps/dir/${props.ride.start.latitude},${props.ride.start.longitude}/${props.ride.end.latitude},${props.ride.end.longitude}`}>
                    <Button className="w-fit font-bold" variant="secondary">
                        <OpenInNewWindowIcon className="mr-1" />
                        Open in Google Maps
                    </Button>
                </a>
            </div>
        </div>
        <Separator className="mb-4" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-2 md:px-0 md:w-3/5 mx-auto">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time (in minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Distance (in mi)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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