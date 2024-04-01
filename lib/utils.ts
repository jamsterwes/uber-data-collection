import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';

const API_KEY = process.env.TOMTOM_API_KEY;
const tomtomClient =axios.create({
  baseURL: 'https://api.tomtom.com'
})
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

//gets routing info for model

export const getRouteInfo = async (startCoordinate: string, endCoordinate: string, time: any) => {
  try {
    const response = await tomtomClient.get('/routing/1/calculateRoute/' + startCoordinate + ':' + endCoordinate + '/json', {
      params: {
        key: API_KEY,
        departureDateTime: time,
        traffic: 'true',
      },
    });
    
    const route = response.data.routes[0];

    return {
      lengthInMeters: route.summary.lengthInMeters,
      travelTimeInSeconds: route.summary.travelTimeInSeconds,
      trafficDelayInSeconds: route.summary.trafficDelayInSeconds,
      noTrafficTravelTimeInSeconds: route.summary.noTrafficTravelTimeInSeconds,
      historicTrafficTravelTimeInSeconds: route.summary.historicTrafficTravelTimeInSeconds,
    };
  } catch (error) {
    console.error('Error getting route information:', error);
    throw error;
  }

};
