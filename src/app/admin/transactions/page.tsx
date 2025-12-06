
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
  
  function TransactionsPage() {

    return (
      <div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="font-bold text-2xl">Transactions</div>
       
          </div>
          <div
            className="rounded-lg border shadow-sm"
            x-chunk="dashboard-01-chunk-4"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction Id</TableHead>
                  <TableHead>Farmer Name</TableHead>
                  <TableHead className="hidden md:table-cell">Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#12345</TableCell>
                  <TableCell>Kumar</TableCell>
                  <TableCell className="hidden md:table-cell">
                    500
                  </TableCell>
                  <TableCell className="hidden md:table-cell">22/05/2024</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Success
                  </TableCell>
                </TableRow>
                </TableBody>
                </Table>
                </div>
                </main>
                </div>
    )}

export default withAdminAuth(TransactionsPage);
