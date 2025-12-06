'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const tickets = [
  {
    ticketId: "TKT-001",
    farmerName: "Rajesh Kumar",
    type: "Technical",
    priority: "high",
    status: "open",
    assignedTo: "Support Team A",
    createdAt: "2024-12-05",
    description: "App is crashing on startup. Please fix.",
  },
  {
    ticketId: "TKT-002",
    farmerName: "Priya Singh",
    type: "Product",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Support Team B",
    createdAt: "2024-12-05",
    description: "How to use the new soil test feature?",
  },
  {
    ticketId: "TKT-003",
    farmerName: "Amit Patel",
    type: "General",
    priority: "low",
    status: "resolved",
    assignedTo: "Support Team A",
    createdAt: "2024-12-04",
    description: "Request for a new feature to track expenses.",
  },
  {
    ticketId: "TKT-004",
    farmerName: "Sunita Devi",
    type: "Technical",
    priority: "high",
    status: "open",
    assignedTo: "Unassigned",
    createdAt: "2024-12-04",
    description: "Unable to login to my account.",
  },
];

const getPriorityVariant = (priority:string): "destructive" | "secondary" | "outline" => {
    switch (priority) {
        case "high":
            return "destructive";
        case "medium":
            return "secondary";
        case "low":
            return "outline";
        default:
            return "outline";
    }
}

const getStatusVariant = (status:string): "destructive" | "secondary" | "success" | "outline" => {
    switch (status) {
        case "open":
            return "destructive";
        case "in-progress":
            return "secondary";
        case "resolved":
            return "success";
        default:
            return "outline";
    }
}

export default function TicketsAndSupport() {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    const exportToCSV = () => {
        const headers = ['Ticket ID', 'Farmer Name', 'Type', 'Priority', 'Status', 'Assigned To', 'Created At'];
        const rows = tickets.map(ticket => [
            ticket.ticketId,
            ticket.farmerName,
            ticket.type,
            ticket.priority,
            ticket.status,
            ticket.assignedTo,
            ticket.createdAt,
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "tickets.csv");
        document.body.appendChild(link);
        link.click();
    };

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Tickets & Support</h1>
                <p className="text-muted-foreground">Manage farmer support requests and issues</p>
            </div>
            <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Farmer Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket) => (
                            <TableRow key={ticket.ticketId}>
                                <TableCell>{ticket.ticketId}</TableCell>
                                <TableCell>{ticket.farmerName}</TableCell>
                                <TableCell>{ticket.type}</TableCell>
                                <TableCell>
                                    <Badge variant={getPriorityVariant(ticket.priority)}>{ticket.priority}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(ticket.status)}>{ticket.status}</Badge>
                                </TableCell>
                                <TableCell>{ticket.assignedTo}</TableCell>
                                <TableCell>{ticket.createdAt}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => setSelectedTicket(ticket)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Ticket Details: {selectedTicket?.ticketId}</DialogTitle>
                                            </DialogHeader>
                                            {selectedTicket && (
                                                <div>
                                                    <p><strong>Farmer:</strong> {selectedTicket.farmerName}</p>
                                                    <p><strong>Type:</strong> {selectedTicket.type}</p>
                                                    <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                                                    <p><strong>Status:</strong> {selectedTicket.status}</p>
                                                    <p><strong>Assigned To:</strong> {selectedTicket.assignedTo}</p>
                                                    <p><strong>Description:</strong> {selectedTicket.description}</p>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
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
