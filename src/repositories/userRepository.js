import { PrismaClient } from "@prisma/client";

export class UsersRepository {
    users = [];
    prisma;

    constructor() {
        this.prisma = new PrismaClient()
    }

    async createTask({ nome, peso, altura, imc, data }) {
        const user = await this.prisma.user.create({
            data: {
                nome,
                peso,
                altura,
                imc,
                data,
            }
        });

        return user;
    }

    async getTasks() {
        const user = await this.prisma.user.findMany()
        return user
    }

    async updateTask(id, {nome, peso, altura, imc, data}) {
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                nome,
                peso,
                altura,
                imc, 
                data,
            }
        })

        return user
    }

    async deleteTask(id) {
        await this.prisma.user.delete({ where: { id } })
    }
}