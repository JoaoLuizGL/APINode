import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DataBasePostgres()

//Criação da rota criar novos registros
server.post('/videos', async (request, reply) => {
    
    const {title,description,duration} = request.body

    console.log(request.body)
    
    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

//Criação da rota para busca de registros
server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})


//Criação da rota para atualização de registros
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title,description,duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

//Criação da rota para exclusão de registros
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})
