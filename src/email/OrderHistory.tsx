import {Html,Preview,Heading,Tailwind,Body,Head,Container,Hr} from "@react-email/components"
import {OrderInformation} from "./components/OrderInformation"
import React from "react"

type OrderHistoryEmailProps={
    orders:{
        id:string
        pricePaidInCents:number
        createdAt:Date 
        downloadVerificationId:string
        product:{
        name:string
        imagePath:string
        description:string
    }
}[]
        
}

OrderHistoryEmail.PreviewProps={
    orders:
    [
        {
            id:crypto.randomUUID(),
            createdAt:new Date(),
            pricePaidInCents:10000,
            downloadVerificationId:crypto.randomUUID(),
            product:
            {
                name:"Product name",
                description:"medium",
                imagePath:
                "public/products/image1.jpg",

            },
        },
        {
        id:crypto.randomUUID(),
        createdAt:new Date(),
        pricePaidInCents:2000,
        downloadVerificationId:crypto.randomUUID(),
        product:
        {name:"Product name 2",
        description:"medium",
        imagePath:"public/products/image2.jpg"
        },
        },
    ],

}satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({orders}:
    OrderHistoryEmailProps){
    return (
       <Html>
        <Preview> Order History and Downloads</Preview>
        <Tailwind>
        <Head/>
        <Body className="font-sans bg-white">
        <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order,index)=>(
                <React.Fragment key={order.id}>
                    <OrderInformation
                key={order.id}
                 order={order} 
                 product={order.product}
                downloadVerificationId={order.
                    downloadVerificationId}
                />
                {index<orders.length-1 && <Hr />}
                </React.Fragment>
                
            ))}
            
            </Container>
        </Body>
        </Tailwind>
       </Html> 
    )
}