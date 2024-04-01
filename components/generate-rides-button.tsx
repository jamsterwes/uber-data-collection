"use client"

import { generateRides } from "@/actions/rides";
import { Button } from "./ui/button";

export default function GenerateRidesButton() {
    return <Button onClick={async () => await generateRides()}>Generate 100 Rides</Button>;
}