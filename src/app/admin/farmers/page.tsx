'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Star } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFarmers = [
  {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    district: "Pune",
    mainCrop: "Wheat",
    farmSize: "5 acres",
    lastActive: "2 hours ago",
    status: "active",
    highPriority: false,
  },
  {
    name: "Priya Singh",
    phone: "+91 98765 43211",
    district: "Mumbai",
    mainCrop: "Rice",
    farmSize: "8 acres",
    lastActive: "1 day ago",
    status: "High Priority",
    highPriority: true,
  },
  {
    name: "Amit Patel",
    phone: "+91 98765 43212",
    district: "Nashik",
    mainCrop: "Cotton",
    farmSize: "12 acres",
    lastActive: "3 days ago",
    status: "inactive",
    highPriority: false,
  },
  {
    name: "Sunita Devi",
    phone: "+91 98765 43213",
    district: "Aurangabad",
    mainCrop: "Tomato",
    farmSize: "3 acres",
    lastActive: "5 hours ago",
    status: "High Priority",
    highPriority: true,
  },
  {
    name: "Vikram Shah",
    phone: "+91 98765 43214",
    district: "Nagpur",
    mainCrop: "Maize",
    farmSize: "10 acres",
    lastActive: "1 week ago",
    status: "inactive",
    highPriority: false,
  },
];

const getStatusVariant = (status: string): "success" | "destructive" | "warning" | "outline" => {
    switch (status) {
        case "active":
            return "success";
        case "inactive":
            return "destructive";
        case "High Priority":
            return "warning";
        default:
            return "outline";
    }
}

export default function FarmersManagement() {
  const [farmers, setFarmers] = useState(initialFarmers);
  const [open, setOpen] = useState(false);
  const [newFarmer, setNewFarmer] = useState({ name: '', phone: '', district: '', mainCrop: '', farmSize: '' });

  const handleAddFarmer = () => {
      setFarmers([...farmers, { ...newFarmer, lastActive: 'Just now', status: 'active', highPriority: false }]);
      setOpen(false);
      setNewFarmer({ name: '', phone: '', district: '', mainCrop: '', farmSize: '' });
  };

  const handleViewFarmer = (farmerName: string) => {
      alert(`Viewing details for ${farmerName}`);
  };

  const handleTogglePriority = (phone: string) => {
      setFarmers(farmers.map(farmer =>
          farmer.phone === phone ? { ...farmer, highPriority: !farmer.highPriority, status: !farmer.highPriority ? "High Priority" : "active" } : farmer
      ));
  };

  const activeFarmers = farmers.filter(f => f.status !== 'inactive').length;
  const inactiveFarmers = farmers.filter(f => f.status === 'inactive').length;
  const highPriorityFarmers = farmers.filter(f => f.highPriority).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">Farmers Management</h1>
            <p className="text-muted-foreground">Manage and monitor all registered farmers</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Farmer</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Farmer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input value={newFarmer.name} onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })} />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input value={newFarmer.phone} onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })} />
                    </div>
                    <div>
                        <Label>District</Label>
                        <Input value={newFarmer.district} onChange={(e) => setNewFarmer({ ...newFarmer, district: e.target.value })} />
                    </div>
                    <div>
                        <Label>Main Crop</Label>
                        <Input value={newFarmer.mainCrop} onChange={(e) => setNewFarmer({ ...newFarmer, mainCrop: e.target.value })} />
                    </div>
                    <div>
                        <Label>Farm Size</Label>
                        <Input value={newFarmer.farmSize} onChange={(e) => setNewFarmer({ ...newFarmer, farmSize: e.target.value })} />
                    </div>
                    <Button onClick={handleAddFarmer}>Add Farmer</Button>
                </div>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
            <span className="text-2xl">👨‍🌾</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFarmers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Farmers</CardTitle>
            <span className="text-2xl">👨‍🌾</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveFarmers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Star className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriorityFarmers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Main Crop</TableHead>
                <TableHead>Farm Size</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.phone}>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>{farmer.phone}</TableCell>
                  <TableCell>{farmer.district}</TableCell>
                  <TableCell>{farmer.mainCrop}</TableCell>
                  <TableCell>{farmer.farmSize}</TableCell>
                  <TableCell>{farmer.lastActive}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(farmer.status)}>{farmer.status}</Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewFarmer(farmer.name)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleTogglePriority(farmer.phone)}>
                      <Star className={`h-4 w-4 ${farmer.highPriority ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
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
