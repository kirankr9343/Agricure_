'use client';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
  {
    name: "Admin User",
    email: "admin@agricure.com",
    phone: "+91 98765 00001",
    role: "super-admin",
  },
  {
    name: "Support Manager",
    email: "support@agricure.com",
    phone: "+91 98765 00002",
    role: "support",
  },
  {
    name: "Content Manager",
    email: "content@agricure.com",
    phone: "+91 98765 00003",
    role: "content",
  },
  {
    name: "Analytics Team",
    email: "analytics@agricure.com",
    phone: "+91 98765 00004",
    role: "viewer",
  },
];

const getRoleVariant = (role:string) => {
    switch (role) {
        case "super-admin":
            return "success";
        case "support":
            return "secondary";
        case "content":
            return "default";
        case "viewer":
            return "outline";
        default:
            return "outline";
    }
}

export default function RolesAndPermissions() {
  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Roles & Permissions</h1>
                <p className="text-muted-foreground">Manage admin users and access control</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">{user.role}</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Super Admin</DropdownMenuItem>
                                            <DropdownMenuItem>Admin</DropdownMenuItem>
                                            <DropdownMenuItem>Support</DropdownMenuItem>
                                            <DropdownMenuItem>Content Manager</DropdownMenuItem>
                                            <DropdownMenuItem>Viewer</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
