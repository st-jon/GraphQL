import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import getUserId from '../utils/getUserId'

const Mutation = {

    async createUser( parent, args, {prisma}, info ){
        if (args.data.password.length < 8) {
            throw new Error('Password must be at least 8 characters long')
        }
        const password =  await bcrypt.hash(args.data.password, 10)
        const user = prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })
        return {
            user,
            token: jwt.sign({userId: user.id}, 'supersecretWhouhou')
        }
    },

    async deleteUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)
        console.log(userId)
        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },

    async updateUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        return prisma.mutation.updateUser({
            data: args.data,
            where: {
                id: userId
            }
        }, info)
    },

    async createPost(parent, args, {prisma, request,  pubsub}, info) {
        const userId = getUserId(request)

        const userExist = await prisma.exists.User({id: args.id})
        if (!userExist) {
            throw new Error('user not found')
        }
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },

    async deletePost(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)
        const postExist = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        console.log(userId)
        console.log(postExist)

        if (!postExist) {
            throw new Error('unable to delete post')
        }
       
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },

    async updatePost(parent, args, {prisma, pubsub}, info) {
        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id : args.id
            }
        }, info)
    
    },
    async createComment(parent, args, {prisma, pubsub}, info) {

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                post: {
                    connect: {
                        id: args.data.post
                    }
                },
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },

    async deleteComment(parent, args, {prisma, pubsub}, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        },info)
    },

    async updateComment(parent, args, {prisma, pubsub}, info) {
        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },

    async login(parent, args, {prisma}, info) {

        const user =  await prisma.query.user({
            where: {
                email: args.data.email
            } 
        })
        if (!user) {
            throw new Error('User not found')
        }

        const match = await bcrypt.compare(args.data.password, user.password)

        if (!match) {
            throw new Error('Password invalid')
        }

        return {
            user,
            token: jwt.sign({userId: user.id}, 'supersecretWhouhou')
        }
    }   
}

export default Mutation