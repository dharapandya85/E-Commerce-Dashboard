import {ProductCardSkeleton,ProductCard} from "@/components/ProductCard";
import {Suspense} from "react"
import {cache} from "@/lib/cache"
import db from "@/app/db/db";
//import db from "@/db/db"

const  getProducts=cache(()=>{
    return db.product.findMany({where:
        {isAvailableForPurchase:true},orderBy:{name:"asc"},
    })
},["/products","getProducts"])
export default function ProductsPage(){
     return <div className="grid grid-cols-1 md:grid-cols-2
      lg:grid-cols-3 gap-4">
        <Suspense fallback={
          <>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          </>
        }>
       <ProductSuspense/>
        </Suspense>
        
        
      </div>
}
async function ProductSuspense(){
    const products= await getProducts()
    return products.map((product: { id: string }) => (
        <ProductCard name={""} priceInCents={0} description={""} imagePath={""} key={product.id} {...product}/>
    ))
    return
}