
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const rentalData = [
  {
    bookingId: "RNT-001",
    equipment: "Tractor - John Deere",
    farmer: "Rajesh Kumar",
    vendor: "Singh Equipment",
    startDate: "2024-12-10",
    endDate: "2024-12-15",
    status: "approved",
  },
  {
    bookingId: "RNT-002",
    equipment: "Harvester Machine",
    farmer: "Priya Singh",
    vendor: "Farm Tech",
    startDate: "2024-12-08",
    endDate: "2024-12-12",
    status: "pending",
  },
  {
    bookingId: "RNT-003",
    equipment: "Sprayer Equipment",
    farmer: "Amit Patel",
    vendor: "Singh Equipment",
    startDate: "2024-12-06",
    endDate: "2024-12-08",
    status: "completed",
  },
  {
    bookingId: "RNT-004",
    equipment: "Rotavator",
    farmer: "Sunita Devi",
    vendor: "Farm Tech",
    startDate: "2024-12-07",
    endDate: "2024-12-11",
    status: "approved",
  },
];

const getStatusVariant = (status:string) => {
    switch (status) {
        case "approved":
            return "success";
        case "pending":
            return "secondary";
        case "completed":
            return "default";
        default:
            return "outline";
    }
}

export default function RentalsManagement() {

    const exportToCSV = () => {
        const headers = ['Booking ID', 'Equipment', 'Farmer', 'Vendor', 'Start Date', 'End Date', 'Status'];
        const rows = rentalData.map(rental => [
            rental.bookingId,
            rental.equipment,
            rental.farmer,
            rental.vendor,
            rental.startDate,
            rental.endDate,
            rental.status,
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "rentals.csv");
        document.body.appendChild(link);
        link.click();
    };

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Rentals Management</h1>
                <p className="text-muted-foreground">Track equipment rental bookings</p>
            </div>
            <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Rental Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rentalData.map((rental) => (
                            <TableRow key={rental.bookingId}>
                                <TableCell>{rental.bookingId}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="hidden h-9 w-9 sm:flex">
                                            <AvatarImage src={`/avatars/${rental.equipment.toLowerCase().replace(/ /g, '-')}.png`} alt={rental.equipment} />
                                            <AvatarFallback>{rental.equipment.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {rental.equipment}
                                    </div>
                                </TableCell>
                                <TableCell>{rental.farmer}</TableCell>
                                <TableCell>{rental.vendor}</TableCell>
                                <TableCell>{rental.startDate}</TableCell>
                                <TableCell>{rental.endDate}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(rental.status)}>{rental.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
