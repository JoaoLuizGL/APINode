import { sql } from './db.js'
import { randomUUID } from "crypto"

export class DataBasePostgres{

    //Método GET para selecionar os vídeos baseados ou não em um 'search'
    async list(search){
        let videos

        if (search)
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        else
            videos = await sql`select * from videos`

        return videos
    }

    //Método POST para criar novos registros no banco de dados
    async create(video){
        const videoId = randomUUID()
        const {title, description, duration} = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    //Método PUT para atualizar um registro no banco
    async update(id, video) {
        const {title, description, duration} = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    //Método DELETE para excluir registros do banco
    async delete(id) {
        await sql`delete from videos WHERE id = ${id}`
    }
}
