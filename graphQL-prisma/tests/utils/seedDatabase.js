import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: "caro",
        email: "caro@gmail.com",
        password: bcrypt.hashSync("abcd1234")
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: "benjamin",
        email: "benjamin@gmail.com",
        password: bcrypt.hashSync("abcd1234")
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: "published post",
        body: "something here",
        published: true,
    },
    post: undefined
}

const postTwo = {
    input: {
        title: "not Published post",
        body: "something else here",
        published: false,
    },
    post: undefined
}

const commentOne = {
    input: {
        text: "new comment from user One"
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: "new comment from user two"
    },
    comment: undefined
}

const seedDatabase = async() => {
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    userOne.user = await prisma.mutation.createUser({
        data: {
            name: "caro",
            email: "caro@gmail.com",
            password: bcrypt.hashSync("abcd1234")
        }
    })
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET)

    userTwo.user = await prisma.mutation.createUser({
        data: {
            name: "benjamin",
            email: "benjamin@gmail.com",
            password: bcrypt.hashSync("abcd1234")
        }
    })
    userTwo.jwt = jwt.sign({userId: userTwo.user.id}, process.env.JWT_SECRET)

    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })
    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })
}

export  {seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo}