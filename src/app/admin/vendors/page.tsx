'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialVendors = [
  {
    name: "Ramesh Traders",
    shopName: "Agri Solutions",
    type: "Seeds",
    district: "Pune",
    rating: 4.5,
    status: "approved",
  },
  {
    name: "Kumar Fertilizers",
    shopName: "Green Farm Store",
    type: "Fertilizers",
    district: "Mumbai",
    rating: null,
    status: "pending",
  },
  {
    name: "Singh Equipment",
    shopName: "Farm Tech",
    type: "Equipment",
    district: "Nashik",
    rating: 4.8,
    status: "approved",
  },
  {
    name: "Patel Organic",
    shopName: "Natural Farms",
    type: "Pesticides",
    district: "Aurangabad",
    rating: 4.2,
    status: "approved",
  },
  {
    name: "Sharma Agro",
    shopName: "AgriMart",
    type: "Seeds",
    district: "Nagpur",
    rating: null,
    status: "blocked",
  },
];


const getStatusVariant = (status:string) => {
    switch (status) {
        case "approved":
            return "success";
        case "pending":
            return "secondary";
        case "blocked":
            return "destructive";
        default:
            return "outline";
    }
}

export default function VendorsAndPartners() {
  const [vendors, setVendors] = useState(initialVendors);
  const [open, setOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<any>(null);
  const [newVendor, setNewVendor] = useState({ name: '', shopName: '', type: '', district: '' });

  const handleAddVendor = () => {
      setVendors([...vendors, { ...newVendor, rating: null, status: 'pending' }]);
      setOpen(false);
      setNewVendor({ name: '', shopName: '', type: '', district: '' });
  };

  const handleEditVendor = () => {
      setVendors(vendors.map(v => v.name === editingVendor.name ? editingVendor : v));
      setEditingVendor(null);
  };

  const handleBlockVendor = (vendorName: string) => {
      setVendors(vendors.map(vendor =>
          vendor.name === vendorName ? { ...vendor, status: vendor.status === 'blocked' ? 'approved' : 'blocked' } : vendor
      ));
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Vendors & Partners</h1>
                <p className="text-muted-foreground">Manage vendor registrations and partnerships</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Add Vendor</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Vendor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input value={newVendor.name} onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })} />
                        </div>
                        <div>
                            <Label>Shop Name</Label>
                            <Input value={newVendor.shopName} onChange={(e) => setNewVendor({ ...newVendor, shopName: e.target.value })} />
                        </div>
                        <div>
                            <Label>Type</Label>
                            <Input value={newVendor.type} onChange={(e) => setNewVendor({ ...newVendor, type: e.target.value })} />
                        </div>
                        <div>
                            <Label>District</Label>
                            <Input value={newVendor.district} onChange={(e) => setNewVendor({ ...newVendor, district: e.target.value })} />
                        </div>
                        <Button onClick={handleAddVendor}>Add Vendor</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Vendors</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Shop Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vendors.map((vendor) => (
                            <TableRow key={vendor.name}>
                                <TableCell>{vendor.name}</TableCell>
                                <TableCell>{vendor.shopName}</TableCell>
                                <TableCell>{vendor.type}</TableCell>
                                <TableCell>{vendor.district}</TableCell>
                                <TableCell>{vendor.rating || "N/A"}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(vendor.status)}>{vendor.status}</Badge>
                                </TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" onClick={() => setEditingVendor(vendor)}>Edit</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Vendor</DialogTitle>
                                            </DialogHeader>
                                            {editingVendor && (
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Name</Label>
                                                        <Input value={editingVendor.name} onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })} />
                                                    </div>
                                                    <div>
                                                        <Label>Shop Name</Label>
                                                        <Input value={editingVendor.shopName} onChange={(e) => setEditingVendor({ ...editingVendor, shopName: e.target.value })} />
                                                    </div>
                                                    <div>
                                                        <Label>Type</Label>
                                                        <Input value={editingVendor.type} onChange={(e) => setEditingVendor({ ...editingVendor, type: e.target.value })} />
                                                    </div>
                                                    <div>
                                                        <Label>District</Label>
                                                        <Input value={editingVendor.district} onChange={(e) => setEditingVendor({ ...editingVendor, district: e.target.value })} />
                                                    </div>
                                                    <Button onClick={handleEditVendor}>Save Changes</Button>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="destructive" size="sm" onClick={() => handleBlockVendor(vendor.name)}>
                                        {vendor.status === 'blocked' ? 'Unblock' : 'Block'}
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
