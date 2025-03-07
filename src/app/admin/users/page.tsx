import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

//import {MoreVertical} from "lucid-react"
import {DropdownMenu,DropdownMenuContent,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {DeleteDropDownItem} from "./_components/UserActions"
import db from "@/app/db/db"
import { PageHeader } from "../_components/PageHeader"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { MoreVertical } from "lucide-react"

type User = {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    orders: { priceInCents: number }[];
};

function getUsers(): Promise<User[]> {
    return db.user.findMany({
        select:{
            id:true,
            email: true,
            createdAt: true,
            updatedAt: true,
            orders: true,
        },
        orderBy:{createdAt:"desc"},
    })
}
export default function UsersPage(){
    return (
        <>
        <PageHeader>Customers</PageHeader>
        <UsersTable/>
        </>
    )
}
async function UsersTable(){
    const users= await getUsers()
    if(users.length ===0) return <p>No customers found</p>

    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell>Email</TableCell>
                <TableCell>Value</TableCell>
                <TableHead className="w-8">
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatNumber(user.orders.length)}</TableCell>
                        <TableCell>
                            {formatCurrency(
                                user.orders.reduce((sum,o)=>o.priceInCents+sum,0)/100
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                <MoreVertical/>
                                <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={user.id}/>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}