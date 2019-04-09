import '@babel/polyfill'
import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'
import bcrypt from 'bcryptjs'

import prisma from '../src/prisma'
import { extractFragmentReplacements } from 'prisma-binding';

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
})

beforeEach(async() => {
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data: {
            name: "caro",
            email: "caro@gmail.com",
            password: bcrypt.hashSync("abccd1234")
        }
    })
    console.log(user)
    await prisma.mutation.createPost({
        data: {
            title: "published post",
            body: "something here",
            published: true,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
    await prisma.mutation.createPost({
        data: {
            title: "not Published post",
            body: "something else here",
            published: false,
            author: {
                connect: {
                    id: user.id
                }
            }
        }
    })
})

test('should create a new user', async() => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "chris"
                    email: "chris@gmail.com"
                    password: "1234ABCD"
                }
            ){
                token,
                user {
                    id,
                    name,
                    password
                }
            }
        }
    `

    const res = await client.mutate({
        mutation: createUser
    })

    const userExists = await prisma.exists.User({id: res.data.createUser.user.id})
    expect(userExists).toBe(true)    
})