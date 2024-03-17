import { getLocations } from "@/actions/locations";
import { getRides } from "@/actions/rides";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

export default async function Dashboard() {

  // TODO: do this better lmao
  const locations = await getLocations();
  const rides = await getRides();

  return <Tabs defaultValue="locations" className="w-full h-full grid grid-rows-[2em_1fr] pt-2">
    <span className="w-full flex justify-center">
      <TabsList>
        <TabsTrigger value="locations">Locations</TabsTrigger>
        <TabsTrigger value="rides">Rides</TabsTrigger>
      </TabsList>
    </span>
    <span className="w-full md:w-[90%] mx-auto h-full px-4 py-4">
      <TabsContent value="locations" className="rounded-md border">
        <div className="flex justify-center gap-2 py-2 border-b">
          <Button>Upload Locations</Button>
          <Button>Download Locations</Button>
        </div>
        <Table>
          <TableCaption>
            List of all possible start/end locations.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {locations.map(location => {
              const url = `https://www.google.com/maps/search/${location.latitude.toFixed(6)},+${location.longitude.toFixed(6)}`

              return <TableRow key={location.id}>
                <TableCell className="font-mono">{location.id.toString()}</TableCell>
                <TableCell>{location.latitude.toFixed(4)}</TableCell>
                <TableCell>{location.longitude.toFixed(4)}</TableCell>
                <TableCell>
                  <a href={url} target="_blank">
                    <Button variant="secondary">
                      <OpenInNewWindowIcon className="mr-2" />
                        View
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="rides" className="rounded-md border">
        <div className="flex justify-center gap-2 py-2 border-b">
          <Button>Download Collected</Button>
        </div>
        <Table>
          <TableCaption>
            List of all possible start/end locations.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Collected</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {rides.map(ride => {
              return <TableRow key={ride.id}>
                <TableCell>
                  <Checkbox checked={ride.collected} disabled />
                </TableCell>
                <TableCell className="font-mono">{ride.id.toString()}</TableCell>
                <TableCell className="text-xs">{ride.start.latitude.toFixed(4)}, {ride.start.longitude.toFixed(4)}</TableCell>
                <TableCell className="text-xs">{ride.start.latitude.toFixed(4)}, {ride.start.longitude.toFixed(4)}</TableCell>
                {/* TODO: formatting */}
                <TableCell>{ride.time ?? 0} min</TableCell>
                <TableCell>{ride.distance ?? 0} mi</TableCell>
                <TableCell>${(ride.price ?? 0).toFixed(2)}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TabsContent>
    </span>
  </Tabs>
}