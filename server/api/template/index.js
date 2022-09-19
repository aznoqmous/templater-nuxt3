import {PrismaClient} from "@prisma/client";

export default defineEventHandler((event) => {

    const prisma = new PrismaClient()
    const result = prisma.template

    return {
        api: 'works'
    }
})