"use client"

import { deleteRides, generateRides } from "@/actions/rides";
import { Button } from "./ui/button";

export default function DeleteRidesButton() {
    return <Button onClick={() => deleteRides()}>Delete Rides</Button>;
}