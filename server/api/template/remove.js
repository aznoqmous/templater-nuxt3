import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async(event) => {
    const prisma = new PrismaClient()
    const body = await useBody(event)
    return await prisma.template.delete({
        where: {
            id: body.id
        }
    })
})