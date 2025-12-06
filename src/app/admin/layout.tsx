'use client';

import Link from 'next/link';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { Home, Briefcase, BarChart2, Users, ShoppingCart, Truck, Settings, LifeBuoy, LogOut } from "lucide-react";
import React from "react";

function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/dashboard" className="flex w-full items-center gap-2"><Home className="h-4 w-4" /> Dashboard</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/products" className="flex w-full items-center gap-2"><Briefcase className="h-4 w-4" /> Products</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/orders" className="flex w-full items-center gap-2"><ShoppingCart className="h-4 w-4" /> Orders</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/farmers" className="flex w-full items-center gap-2"><Users className="h-4 w-4" /> Farmers</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/analytics" className="flex w-full items-center gap-2"><BarChart2 className="h-4 w-4" /> Analytics</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/vendors" className="flex w-full items-center gap-2"><Truck className="h-4 w-4" /> Vendors</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/admin/settings" className="flex w-full items-center gap-2"><Settings className="h-4 w-4" /> Settings</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton><LifeBuoy className="h-4 w-4" /> Help</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton><LogOut className="h-4 w-4" /> Logout</SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex">
                <AdminSidebar />
                <SidebarInset className="p-6 w-full">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
