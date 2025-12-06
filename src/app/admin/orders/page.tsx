'use client';

import { useState } from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Download } from "lucide-react";
import { useRouter } from 'next/navigation';

const ordersData = [
  {
    orderId: "ORD-001",
    product: "Wheat Seeds Premium",
    farmer: "Rajesh Kumar",
    amount: "2,250",
    paymentStatus: "paid",
    orderStatus: "Delivered",
    date: "2024-12-05",
  },
  {
    orderId: "ORD-002",
    product: "NPK Fertilizer",
    farmer: "Priya Singh",
    amount: "4,250",
    paymentStatus: "pending",
    orderStatus: "Processing",
    date: "2024-12-05",
  },
  {
    orderId: "ORD-003",
    product: "Drip Irrigation Kit",
    farmer: "Amit Patel",
    amount: "15,000",
    paymentStatus: "paid",
    orderStatus: "Shipped",
    date: "2024-12-04",
  },
  {
    orderId: "ORD-004",
    product: "Organic Pesticide",
    farmer: "Sunita Devi",
    amount: "960",
    paymentStatus: "failed",
    orderStatus: "Cancelled",
    date: "2024-12-04",
  },
  {
    orderId: "ORD-005",
    product: "Rice Seeds Basmati",
    farmer: "Vikram Shah",
    amount: "3,400",
    paymentStatus: "paid",
    orderStatus: "Delivered",
    date: "2024-12-03",
  },
];

const getPaymentStatusBadgeVariant = (status: string): BadgeProps['variant'] => {
    switch (status) {
        case 'paid':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'failed':
            return 'destructive';
        default:
            return 'outline';
    }
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState(ordersData);
  const router = useRouter();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => order.orderId === orderId ? { ...order, orderStatus: newStatus } : order));
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Product', 'Farmer', 'Amount', 'Payment Status', 'Order Status', 'Date'];
    const rows = orders.map(order => [
      order.orderId,
      order.product,
      order.farmer,
      order.amount,
      order.paymentStatus,
      order.orderStatus,
      order.date,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Orders Management</h1>
                <p className="text-muted-foreground">Track and manage all product orders</p>
            </div>
            <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export Orders
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Farmer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.product}</TableCell>
                                <TableCell>{order.farmer}</TableCell>
                                <TableCell>₹{order.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                                        {order.paymentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-32 justify-between">
                                                {order.orderStatus} <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onSelect={() => handleStatusChange(order.orderId, 'Processing')}>Processing</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleStatusChange(order.orderId, 'Shipped')}>Shipped</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleStatusChange(order.orderId, 'Delivered')}>Delivered</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleStatusChange(order.orderId, 'Cancelled')}>Cancelled</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Button variant="outline" onClick={() => handleViewDetails(order.orderId)}>View Details</Button>
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
