import { NotFoundError } from 'elysia'
import db from '../../db'

export async function getPosts() {
    try {
        return await db.post.findMany({orderBy: { createdAt: 'asc'}})
    } catch (e: unknown) {
        console.log(`Error getting posts: ${e}`)
    }
}

export async function getPost(id: number) {
    try {
        const post =  await db.post.findUnique({where: {id}})
        if (!post) {
            throw new NotFoundError('Post not found')
        }
        return post;
    } catch (e: unknown) {
        console.log(`Error finding post: ${e}`)
    }
}

export async function createPost(options: { title: string, content: string }) {
    try {
        const { title, content } = options;
        return await db.post.create({
            data: {
                title,
                content,
            }
        });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}
export async function updatePost(id: number, options: { title?: string, content?: string }) {
    try {
        const post = await db.post.findUnique({ where: { id } });
        if (!post) {
            throw new Error(`Post with id ${id} not found`);
        }

        const { title, content } = options;
        return await db.post.update({
            where: { id },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}) 
            }
        });
    } catch (e: unknown) {
        console.log(`Error updating post: ${e}`);
        throw e; 
    }
}



export async function deletePost(options: {id: number}) {
    try {
        const {id} = options;
        return await db.post.delete({ where: {id}})
    } catch (e: unknown) {
        console.log(`Error delete post: ${e}`)
    }
}