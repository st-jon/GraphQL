const Subscription = {
    count: {
        subscribe(parent, args, {pubsub}, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 10000)

            return pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, args, {db, pubsub}, info) {
            const post = db.posts.find(post => post.id === args.postId && post.published)

            if (!post) {
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${args.postId}`)
        }
    },
    post: {
        subscribe(parent, args, {db, pubsub}, info) {
            return pubsub.asyncIterator('post')
        }
    }

}

export default Subscription