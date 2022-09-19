import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async(event) => {
    const prisma = new PrismaClient()
    return await prisma.template.findFirst({
        where: {
            id: parseInt(event.context.params.id)
        }
    })
})