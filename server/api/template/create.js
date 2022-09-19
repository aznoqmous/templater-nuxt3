import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const prisma = new PrismaClient()
    return prisma.template.create({
        data: body
    })
})