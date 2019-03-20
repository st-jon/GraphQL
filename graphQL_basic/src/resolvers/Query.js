const Query = {
    posts( parent, args, {db}, info ) {
        if(!args.query) {
            return db.posts
        }
        return db.posts.filter(post => {
            return  db.post.title.toLowerCase().includes(args.query.toLowerCase())
                ||  db.post.body.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    users( parent, args, {db}, info ) {
        if(!args.query) {
            return db.users
        }
        return db.users.filter(user => {
            return db.user.name.toLowerCase().includes(args.query.toLowerCase())
        })
        
    },
    comments( parent, args, {db}, info ) {
        if(!args.query) {
            return db.comments
        }
        return db.comments.filter(comment => {
            return db.comment.text.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    me() {
        return {
            id: '123ABC',
            name: 'chris',
            email: 'c.johanny@gmail.com',
        }
    },
    post() {
        return {
            id: 'JHQHDHJQDI',
            title: 'New graphql logic for dummies',
            published: false
        }
    }
}

export default Query