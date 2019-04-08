import getUserId from '../utils/getUserId'

const Query = {
    users( parent, args, {prisma}, info ) {
        const userQuery = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        }
        if (args.query) {
            userQuery.where = {
                OR: [{
                    name_contains: args.query
                }]
                
            }
        }
        return prisma.query.users(userQuery, info)
    },
    myPosts( parent, args, {prisma, request}, info ) {
        const userId = getUserId(request)

        const postQuery = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                author: {
                    id: userId
                }  
            }
        }
        if (args.query) {
            postQuery.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }

        return prisma.query.posts(postQuery, info)

    },
    posts( parent, args, {prisma}, info ) {
        const postQuery = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }
        if (args.query) {
            postQuery.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(postQuery, info)
    },
    comments( parent, args, {prisma}, info ) {
        const commentQuery = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        }
        if (args.query) {
            commentQuery.where = {
                text_contains: args.query
            } 
        }
        return prisma.query.comments(commentQuery, info)

    },
    async post(parent, args, {prisma, request}, info ) {
        const userId = getUserId(request, false)

        const posts = await prisma.query.posts({    
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if (posts.length === 0) {
            throw new Error('Post not found')
        }

        return posts[0]
    },
    async me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    }
}

export default Query