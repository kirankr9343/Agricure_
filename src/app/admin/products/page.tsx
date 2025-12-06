'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { z } from "zod";

interface Product {
  id: number;
  productName: string;
  category: string;
  crop: string;
  price: string;
  stock: number;
  vendor: string;
  location: string;
  status: string;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    productName: "Wheat Seeds Premium",
    category: "Seeds",
    crop: "Wheat",
    price: "₹450",
    stock: 250,
    vendor: "Ramesh Traders",
    location: "Pune",
    status: "In Stock",
    image: "/images/wheat-seeds.jpg",
  },
  {
    id: 2,
    productName: "NPK Fertilizer 20-20-20",
    category: "Fertilizers",
    crop: "All Crops",
    price: "₹850",
    stock: 0,
    vendor: "Kumar Fertilizers",
    location: "Mumbai",
    status: "Out of Stock",
    image: "/images/npk-fertilizer.jpg",
  },
  {
    id: 3,
    productName: "Drip Irrigation Kit",
    category: "Equipment",
    crop: "All Crops",
    price: "₹15000",
    stock: 15,
    vendor: "Singh Equipment",
    location: "Nashik",
    status: "In Stock",
    image: "/images/drip-irrigation-kit.jpg",
  },
  {
    id: 4,
    productName: "Organic Pesticide",
    category: "Pesticides",
    crop: "Vegetables",
    price: "₹320",
    stock: 180,
    vendor: "Patel Organic",
    location: "Aurangabad",
    status: "In Stock",
    image: "/images/organic-pesticide.jpg",
  },
  {
    id: 5,
    productName: "Rice Seeds Basmati",
    category: "Seeds",
    crop: "Rice",
    price: "₹680",
    stock: 120,
    vendor: "Ramesh Traders",
    location: "Pune",
    status: "In Stock",
    image: "/images/rice-seeds.jpg",
  },
];

const formSchema = z.object({
    productName: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    crop: z.string().min(1, "Crop is required"),
    price: z.string().min(1, "Price is required"),
    stock: z.coerce.number().min(0, "Stock must be a positive number"),
    vendor: z.string().min(1, "Vendor is required"),
    location: z.string().min(1, "Location is required"),
    status: z.string().min(1, "Status is required"),
    image: z.string().min(1, "Image URL is required"),
  });

const getStatusVariant = (status: string): "success" | "destructive" | "outline" => {
    switch (status) {
        case "In Stock":
            return "success";
        case "Out of Stock":
            return "destructive";
        default:
            return "outline";
    }
}

export default function ProductsManagement() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleDialogSubmit = (values: z.infer<typeof formSchema>) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...values, id: editingProduct.id } : p));
        } else {
            const newProduct = { ...values, id: Date.now() };
            setProducts([...products, newProduct]);
        }
        setIsDialogOpen(false);
        setEditingProduct(null);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsDialogOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const handleDelete = (productId: number) => {
        setProducts(products.filter(p => p.id !== productId));
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">Manage product inventory across all vendors</p>
        </div>
        <Button onClick={handleAddClick}>Add Product</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
              setEditingProduct(null);
          }
      }}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <ProductForm product={editingProduct} onSubmit={handleDialogSubmit} />
          </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={product.image} alt={product.productName} />
                            <AvatarFallback>{product.productName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {product.productName}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.crop}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.vendor}</TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
