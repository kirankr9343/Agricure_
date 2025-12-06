'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";

const diseaseScans = [
  {
    scanId: "SCN-001",
    farmer: "Rajesh Kumar",
    crop: "Wheat",
    predictedDisease: "Leaf Rust",
    confidence: "94%",
    severity: "high",
    status: "pending",
    date: "2024-12-05",
  },
  {
    scanId: "SCN-002",
    farmer: "Priya Singh",
    crop: "Rice",
    predictedDisease: "Bacterial Blight",
    confidence: "87%",
    severity: "medium",
    status: "approved",
    date: "2024-12-05",
  },
  {
    scanId: "SCN-003",
    farmer: "Amit Patel",
    crop: "Cotton",
    predictedDisease: "Cotton Bollworm",
    confidence: "91%",
    severity: "high",
    status: "sent-to-expert",
    date: "2024-12-04",
  },
  {
    scanId: "SCN-004",
    farmer: "Sunita Devi",
    crop: "Tomato",
    predictedDisease: "Early Blight",
    confidence: "96%",
    severity: "medium",
    status: "approved",
    date: "2024-12-05",
  },
];

const getSeverityVariant = (severity:string) => {
    switch (severity) {
        case "high":
            return "destructive";
        case "medium":
            return "secondary";
        default:
            return "outline";
    }
}

const getStatusVariant = (status:string) => {
    switch (status) {
        case "pending":
            return "secondary";
        case "approved":
            return "success";
        case "sent-to-expert":
            return "warning";
        default:
            return "outline";
    }
}

export default function DiseaseScans() {
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">AI & Disease Scans</h1>
                <p className="text-muted-foreground">Monitor and review AI-powered crop disease detections</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Disease Scans</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Scan ID</TableHead>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Crop</TableHead>
                            <TableHead>Predicted Disease</TableHead>
                            <TableHead>Confidence</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {diseaseScans.map((scan) => (
                            <TableRow key={scan.scanId}>
                                <TableCell>{scan.scanId}</TableCell>
                                <TableCell>{scan.farmer}</TableCell>
                                <TableCell>{scan.crop}</TableCell>
                                <TableCell>{scan.predictedDisease}</TableCell>
                                <TableCell>{scan.confidence}</TableCell>
                                <TableCell>
                                    <Badge variant={getSeverityVariant(scan.severity)}>{scan.severity}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(scan.status)}>{scan.status}</Badge>
                                </TableCell>
                                <TableCell>{scan.date}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
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
