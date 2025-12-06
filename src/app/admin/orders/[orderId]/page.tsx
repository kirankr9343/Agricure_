'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from 'react';

const ordersData = {
    "ORD-001": { orderId: "ORD-001", product: "Wheat Seeds Premium", farmer: "Rajesh Kumar", amount: "₹2,250", paymentStatus: "paid", orderStatus: "Delivered", date: "2024-12-05", shippingAddress: "123 Green Valley, Farmville, State, 54321", items: [{ name: "Wheat Seeds Premium", quantity: 1, price: "₹2,250" }] },
    "ORD-002": { orderId: "ORD-002", product: "NPK Fertilizer", farmer: "Priya Singh", amount: "₹4,250", paymentStatus: "pending", orderStatus: "Processing", date: "2024-12-05", shippingAddress: "456 Harvest Moon Rd, Countryside, State, 98765", items: [{ name: "NPK Fertilizer", quantity: 1, price: "₹4,250" }] },
    "ORD-003": { orderId: "ORD-003", product: "Drip Irrigation Kit", farmer: "Amit Patel", amount: "₹15,000", paymentStatus: "paid", orderStatus: "Shipped", date: "2024-12-04", shippingAddress: "789 Water Stream Ave, Riverside, State, 12345", items: [{ name: "Drip Irrigation Kit", quantity: 1, price: "₹15,000" }] },
    "ORD-004": { orderId: "ORD-004", product: "Organic Pesticide", farmer: "Sunita Devi", amount: "₹960", paymentStatus: "failed", orderStatus: "Cancelled", date: "2024-12-04", shippingAddress: "101 Pesticide Free Ln, Organica, State, 67890", items: [{ name: "Organic Pesticide", quantity: 1, price: "₹960" }] },
    "ORD-005": { orderId: "ORD-005", product: "Rice Seeds Basmati", farmer: "Vikram Shah", amount: "₹3,400", paymentStatus: "paid", orderStatus: "Delivered", date: "2024-12-03", shippingAddress: "212 Rice Paddy Blvd, Grainsville, State, 54321", items: [{ name: "Rice Seeds Basmati", quantity: 1, price: "₹3,400" }] },
};

type Order = typeof ordersData[keyof typeof ordersData];

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.orderId) {
      const orderId = params.orderId as string;
      const foundOrder = ordersData[orderId as keyof typeof ordersData] || null;
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [params.orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Product:</strong> {order.product}</p>
            <p><strong>Farmer:</strong> {order.farmer}</p>
            <p><strong>Amount:</strong> {order.amount}</p>
            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Order Status:</strong> {order.orderStatus}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        </CardContent>
    </Card>
  );
}
