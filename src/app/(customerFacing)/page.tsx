//import db from "@/db/db"
import Link from "next/link"
import {cache} from "@/lib/cache"
import {Suspense} from "react"
//import { PrismaClient, Prisma } from '@prisma/client'

import {Button} from "@/components/ui/button"
//import db from "../db/db"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { PrismaClient } from "@prisma/client"
type Product = {
  id: string;
  name: string;
  price: number;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  // Add other fields as necessary
}
import {ArrowRight} from "lucide-react"
import db from "../db/db"
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"

const getMostPopularProducts=cache(()=>{
  //await wait(1000)
  return db.product.findMany({
    where:{isAvailableForPurchase:true},
    orderBy:{orders:{ _count:"desc"}},
    take:6,
  })
},["/","getMostPopularProducts"],
{revalidate:60*60*24})


const getNewestProducts=cache(()=>{
  //await wait(2000)
  return db.product.findMany({
    where:{isAvailableForPurchase:true},
    orderBy:{createdAt:"desc"},
    take: 6,
  })
},["/","getNewestProducts"])


export default function HomePage() {
  return <main className="space-y-12">
    <ProductGridSection title="Most Popular" 
    productsFetcher={getMostPopularProducts}/>

    <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
  </main>
}
type  ProductGridSectionProps={
  title:string
  //const userData:Prisma.UserCreateInput[]=Product
  productsFetcher:()=>Promise<Product[]>
}
async function ProductGridSection({productsFetcher,title}:ProductGridSectionProps){
return(
  <div className="space-y-4">
    <div className="flex gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button variant="outline" asChild>
        <Link href="/products" className="space-x-2">
        <span> View All</span>
        <ArrowRight className="size-4">

        </ArrowRight>
        </Link>
      </Button>
    </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2
  lg:grid-cols-3 gap-4">
    <Suspense fallback={
      <>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      <ProductCardSkeleton/>
      </>
    }>
   <ProductSuspense productsFetcher={productsFetcher}/>
    </Suspense>
    
    
  </div>
  </div>
)
}
async function ProductSuspense({
  productsFetcher,

}:{
  productsFetcher:()=>Promise<Product[]>
}) {
  return (await productsFetcher()).map(product=>(
    <ProductCard priceInCents={0} description={""} imagePath={""} key={product.id} {...product}/>
  ))
}