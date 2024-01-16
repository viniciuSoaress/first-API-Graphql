import { PrismaClient } from "@prisma/client";


type User = {
  name: string,
  age: number
}

export class PrismaDB {
  readonly dbPrisma = new PrismaClient()

  async getUSers() {
   return await this.dbPrisma.user.findMany({
      take: 5
    })
  }

  async createUser(newData: User) {
    const { age, name } = newData
    await this.dbPrisma.user.create({
      data: { name, age }
    })
  }

  async deleteUser(id: string){
    await this.dbPrisma.user.delete({
      where: {id},
    })
  }

  async updateUser(id: string, data: User){
    const {name, age} = data

    await this.dbPrisma.user.update({
      data: {age, name},
      where: {id}
    })
  }
}