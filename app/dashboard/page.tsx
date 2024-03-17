import { getLocations } from "@/actions/locations";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

export default async function Dashboard() {

    // TODO: do this better lmao
    const locations = await getLocations();

    return <Tabs defaultValue="locations" className="w-full h-full grid grid-rows-[2em_1fr] pt-2">
        <span className="w-full flex justify-center">
            <TabsList>
                <TabsTrigger value="locations">Locations</TabsTrigger>
                <TabsTrigger value="rides">Rides</TabsTrigger>
            </TabsList>
        </span>
        <span className="w-full h-full px-4 pt-2">
            <TabsContent value="locations" className="rounded-md border">
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
                                    <Button>
                                        <OpenInNewWindowIcon className="mr-2" />
                                        <a href={url} target="_blank">
                                            View
                                        </a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="rides">
                ...
            </TabsContent>
        </span>
    </Tabs>
}