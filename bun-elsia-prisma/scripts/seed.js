const {PrismaClient} = require('@prisma/client')

const client = new PrismaClient();

const postToCreate = [
    {
        id: 1,
        title: 'First Post',
        content: 'The first post'
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'The second post'
    }
]

const seed = async (posts) => {
    console.log('Creating posts ...')
    for (let i = 0; i< posts.length ; i++) {
        console.log('Creating post:', posts[i])
        await client.post.upsert({
            where: {id: posts[i].id},
            update: posts[i],
            create: posts[i],
        })
    }
}

seed(postToCreate)
    .then(() => {
        console.log('Created/Updated posts successfully.')
    })
    .catch((error) => {
        console.error('Error:', error)
    })
    .finally(()=> {
        client.$disconnect()
        console.log('Disconnected Prisma Client, exting')
    })