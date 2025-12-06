
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
  
  import { MoreHorizontal } from "lucide-react";
  import { Checkbox } from "@/components/ui/checkbox";
  import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";

    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
      } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
  
  function AdvisoriesPage() {

    return (
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="font-bold text-2xl">Advisories</div>
       
          </div>
          <div
            className="rounded-lg border shadow-sm"
            x-chunk="dashboard-01-chunk-4"
          >
            </div>
                </main>
                </div>
    )}

export default withAdminAuth(AdvisoriesPage);
