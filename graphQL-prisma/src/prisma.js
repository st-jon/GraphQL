import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

export default prisma
// prisma.query.users(null, '{id name email}')
//     .then(data => console.log(JSON.stringify(data, undefined, 4)))

// prisma.query.comments(null, '{id, text, author {id name}}')
//     .then(data => console.log(JSON.stringify(data, undefined, 4)))

// prisma.mutation.updatePost({
//     where: {
//         id: 'cjtjw1z310bro0818o8rjcg7n'
//     },
//     data: {
//         body: "changed text from the post",
//         published: true
//     }
// }, '{id}')
//     .then(data => prisma.query.posts(null, '{id title body published}'))
//     .then(data => console.log(data))

// const createPostForUser = async (authorId, data) => {
//     const userExist = await prisma.exists.User({id: authorId})

//     if (!userExist) {
//         throw new Error('user not found')
//     }
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
        
//     }, '{author {id name email posts {id title published}}}')

//     return post
// }

// createPostForUser('cjtjvjo860biy0818vpndthnf', {
//     title: 'great',
//     body: 'something should show there',
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 4))
// }).catch(err => console.log(err.message))


// const updatePostForUser = async (postId, data) => {
//     const postExist = await prisma.exists.Post({id: postId})

//     if (!postExist) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{author {name email posts {id title published}}}')

//     return post
// }

// updatePostForUser('cjtk03z2r01a20818wrsvm04k', {
//     title: 'So Great',
//     body: 'something should show there',
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 4))
// }).catch(err => console.log(err.message))