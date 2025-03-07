import {useTransition} from "react"
import {deleteOrder} from "../../_actions/orders"
import {useRouter} from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
//import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
//import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function DeleteDropDownItem({id}:{id:string}){
    const [isPending,startTransition]=useTransition()
    const router=useRouter()

    return(
        <DropdownMenuItem variant="destructive" disabled={isPending} onClick={()=>
            startTransition(async()=>{
                await deleteOrder(id)
                router.refresh()
            })
        }
        >
            Delete

        </DropdownMenuItem>
    )
}