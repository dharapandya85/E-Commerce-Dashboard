import db from "@/app/db/db";
import { PageHeader } from "../_components/PageHeader";
import { MoreVertical, Table } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteDropDownItem } from "../users/_components/UserActions";

function getOrders(){
    return db.order.findMany({
        select:{
            id:true,
            priceInCents:true,
            product:{select:{name:true}},
            user:{select:{email:true}},
        },
        orderBy:{createdAt:"desc"},
    })
}
export default function OrdersPage(){
    return(
        <>
        <PageHeader>Sales</PageHeader>
        <OrdersTable/>
        </>
    )
}
async function OrdersTable(){
    const orders=await getOrders()
    if(orders.length==0) return <p>No sales Found</p>
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price Paid</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order: { id: string; priceInCents: number; product: { name: string }; user: { email: string } }) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>
                            {formatCurrency(order.priceInCents/100)}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical/>
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={order.id}/>

                                    </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}