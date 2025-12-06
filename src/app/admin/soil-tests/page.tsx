'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const soilTests = [
  {
    testId: "ST-001",
    farmer: "Rajesh Kumar",
    location: "Pune, MH",
    testType: "NPK Analysis",
    phLevel: "6.8",
    npk: "N: High, P: Medium, K: Low",
    status: "completed",
    date: "2024-12-05",
  },
  {
    testId: "ST-002",
    farmer: "Priya Singh",
    location: "Mumbai, MH",
    testType: "Full Analysis",
    phLevel: "-",
    npk: "N: -, P: -, K: -",
    status: "pending",
    date: "2024-12-05",
  },
  {
    testId: "ST-003",
    farmer: "Amit Patel",
    location: "Nashik, MH",
    testType: "NPK Analysis",
    phLevel: "7.2",
    npk: "N: Medium, P: High, K: Medium",
    status: "completed",
    date: "2024-12-04",
  },
];

const getStatusVariant = (status:string): "success" | "secondary" | "outline" => {
    switch (status) {
        case "completed":
            return "success";
        case "pending":
            return "secondary";
        default:
            return "outline";
    }
}

export default function SoilTestsManagement() {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<any>(null);

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Soil Tests Management</h1>
                <p className="text-muted-foreground">Track and manage soil test requests and results</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Soil Tests</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Test ID</TableHead>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Test Type</TableHead>
                            <TableHead>pH Level</TableHead>
                            <TableHead>NPK</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {soilTests.map((test) => (
                            <TableRow key={test.testId}>
                                <TableCell>{test.testId}</TableCell>
                                <TableCell>{test.farmer}</TableCell>
                                <TableCell>{test.location}</TableCell>
                                <TableCell>{test.testType}</TableCell>
                                <TableCell>{test.phLevel}</TableCell>
                                <TableCell>{test.npk}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(test.status)}>{test.status}</Badge>
                                </TableCell>
                                <TableCell>{test.date}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                onClick={() => setSelectedTest(test)}
                                                disabled={test.status === 'pending'}
                                            >
                                                View Report
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Soil Test Report: {selectedTest?.testId}</DialogTitle>
                                            </DialogHeader>
                                            {selectedTest && (
                                                <div>
                                                    <p><strong>Farmer:</strong> {selectedTest.farmer}</p>
                                                    <p><strong>Location:</strong> {selectedTest.location}</p>
                                                    <p><strong>Test Type:</strong> {selectedTest.testType}</p>
                                                    <p><strong>pH Level:</strong> {selectedTest.phLevel}</p>
                                                    <p><strong>NPK:</strong> {selectedTest.npk}</p>
                                                    <p><strong>Recommendations:</strong></p>
                                                    <ul>
                                                        <li>Nitrogen: Add urea fertilizer.</li>
                                                        <li>Phosphorus: Apply DAP.</li>
                                                        <li>Potassium: Use Muriate of Potash.</li>
                                                    </ul>
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
