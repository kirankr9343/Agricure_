'use client'
import withAdminAuth from '../withAdminAuth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Eye } from "lucide-react";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
  import Image from 'next/image';
  import { useState } from 'react';

  const scans = [
    {
      scanId: "#12345",
      farmerName: "Kumar",
      crop: "Rice",
      predictedDisease: "Leaf Blight",
      confidence: "98%",
      severity: "High",
      status: "Pending",
      date: "22/05/2024",
      imageUrl: "/images/rice-leaf-blight.jpg",
      description: "The scan indicates a high probability of Leaf Blight. Recommended actions: apply fungicide, monitor crop closely."
    },
    {
      scanId: "#12346",
      farmerName: "Sita",
      crop: "Tomato",
      predictedDisease: "Early Blight",
      confidence: "95%",
      severity: "Medium",
      status: "Reviewed",
      date: "21/05/2024",
      imageUrl: "/images/tomato-early-blight.jpg",
      description: "Early blight detected. Suggest removing affected leaves and using a copper-based fungicide."
    },
    {
      scanId: "#12347",
      farmerName: "Gopal",
      crop: "Wheat",
      predictedDisease: "Healthy",
      confidence: "99%",
      severity: "N/A",
      status: "Completed",
      date: "20/05/2024",
      imageUrl: "/images/healthy-wheat.jpg",
      description: "The plant appears to be healthy. No disease detected."
    }
  ];

  const getStatusVariant = (status: string):"secondary" | "warning" | "success" | "outline"=> {
      switch (status) {
          case 'Pending':
              return 'secondary';
          case 'Reviewed':
              return 'warning';
          case 'Completed':
              return 'success';
          default:
              return 'outline';
      }
  };

  function AiScansPage() {
    const [selectedScan, setSelectedScan] = useState<any>(null);

    return (
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="font-bold text-2xl">AI & Disease Scans</div>
          </div>
          <div
            className="rounded-lg border shadow-sm"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sm:table-cell">
                  <Checkbox aria-label="Select all" />
                  </TableHead>
                  <TableHead>Scan Id</TableHead>
                  <TableHead>Farmer Name</TableHead>
                  <TableHead className="hidden md:table-cell">Crop</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Predicted Disease
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Confidence</TableHead>
                  <TableHead className="hidden md:table-cell">Severity</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scans.map((scan) => (
                  <TableRow key={scan.scanId}>
                    <TableCell className="hidden sm:table-cell">
                    <Checkbox aria-label="Select row" />
                    </TableCell>
                    <TableCell className="font-medium">{scan.scanId}</TableCell>
                    <TableCell>{scan.farmerName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {scan.crop}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{scan.predictedDisease}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {scan.confidence}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {scan.severity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={getStatusVariant(scan.status)}>{scan.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {scan.date}
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedScan(scan)}>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        {selectedScan && (
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Scan Details: {selectedScan.scanId}</SheetTitle>
                            <SheetDescription>
                              Detailed information about the AI-based crop disease scan.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-4 space-y-4">
                            {selectedScan.imageUrl && (
                                <div className="relative w-full h-48">
                                    <Image src={selectedScan.imageUrl} alt={`Scan for ${selectedScan.crop}`} layout="fill" objectFit="cover" className="rounded-md" />
                                </div>
                            )}
                            <div><strong>Farmer:</strong> {selectedScan.farmerName}</div>
                            <div><strong>Crop:</strong> {selectedScan.crop}</div>
                            <div><strong>Predicted Disease:</strong> {selectedScan.predictedDisease}</div>
                            <div><strong>Confidence:</strong> {selectedScan.confidence}</div>
                            <div><strong>Severity:</strong> {selectedScan.severity}</div>
                            <div><strong>Status:</strong> {selectedScan.status}</div>
                            <div><strong>Date:</strong> {selectedScan.date}</div>
                            <div><strong>Description:</strong> {selectedScan.description}</div>
                          </div>
                        </SheetContent>
                        )}
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
                </Table>
                </div>
                </main>
                </div>
    )}


export default withAdminAuth(AiScansPage);
