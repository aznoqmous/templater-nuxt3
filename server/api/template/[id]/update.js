import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const prisma = new PrismaClient()
    return await prisma.template.update({
        where: {
            id: parseInt(event.context.params.id)
        },
        data: body
    })
})