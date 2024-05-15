/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
    console.log('Jonaserver')
    response.write('Jonasvegador')

    return response.end()
})

server.listen(3333) */

import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DataBaseMemory();

server.get('/', () => {
    return 'Lista de Vídeos'
})

server.post('/videos', (request, reply) => {
    
    const {title,description,duration} = request.body

    console.log(request.body)
    
    database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})


server.get('/videos', () => {
    const videos = database.list()

    console.log(videos)

    return videos
})



server.put('/videos/:{id}', (request, reply) => {
    const videoId = request.params.body
    const {title,description,duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', () => {
    return 'Apagou'
})

server.listen({
    port: 3333
})