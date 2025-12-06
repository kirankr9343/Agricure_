'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const recentOrders = [
    {
        orderId: "ORD-001",
        product: "Wheat Seeds Premium",
        farmer: "Rajesh Kumar",
        amount: "2,250",
        status: "Delivered",
    },
    {
        orderId: "ORD-002",
        product: "NPK Fertilizer",
        farmer: "Priya Singh",
        amount: "4,250",
        status: "Processing",
    },
    {
        orderId: "ORD-003",
        product: "Drip Irrigation Kit",
        farmer: "Amit Patel",
        amount: "15,000",
        status: "Shipped",
    },
];

const recentRegistrations = [
    {
        user: "Suresh Gupta",
        type: "Farmer",
        date: "2024-12-08",
    },
    {
        user: "Deepak Sharma",
        type: "Vendor",
        date: "2024-12-07",
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-2xl">💰</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,25,430</div>
                        <p className="text-xs text-muted-foreground">+15.2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                        <span className="text-2xl">📦</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+82</div>
                        <p className="text-xs text-muted-foreground">+22% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Farmers</CardTitle>
                        <span className="text-2xl">👨‍🌾</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+45</div>
                        <p className="text-xs text-muted-foreground">+30% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <span className="text-2xl">⏳</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 new vendor requests</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>A list of the most recent orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.product}</TableCell>
                                        <TableCell>{order.farmer}</TableCell>
                                        <TableCell>₹{order.amount}</TableCell>
                                        <TableCell><Badge>{order.status}</Badge></TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <CardDescription>New users who signed up recently.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentRegistrations.map((reg, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{reg.user}</p>
                                    <p className="text-sm text-muted-foreground">{reg.type}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">{reg.date}</p>
                            </div>
                        ))}
                         <Button variant="outline" className="w-full mt-4">
                            <Link href="/admin/farmers">View All Registrations</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
