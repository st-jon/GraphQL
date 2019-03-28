const Query = {
    users( parent, args, {prisma}, info ) {
        const userQuery = {}
        if (args.query) {
            userQuery.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
                
            }
        }
        return prisma.query.users(userQuery, info)
    },
    posts( parent, args, {prisma}, info ) {
        const postQuery = {}
        if (args.query) {
            postQuery.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
                
            }
        }
        return prisma.query.posts(postQuery, info)
    },
    comments( parent, args, {prisma}, info ) {
        const commentQuery = {}
        if (args.query) {
            commentQuery.where = {
                text_contains: args.query
            } 
        }
        return prisma.query.comments(commentQuery, info)

    },
}

export default Query