import {PrismaClient} from '@prisma/client'

const prismaClientSingleton=()=>{
    return new PrismaClient()
}

declare global {
    // eslint-disable-next-line no-var
    var db: undefined | ReturnType<typeof prismaClientSingleton>;
}
const db =globalThis.db ?? prismaClientSingleton()

export default db

if(process.env.NODE_ENV!=='production') globalThis.db=db