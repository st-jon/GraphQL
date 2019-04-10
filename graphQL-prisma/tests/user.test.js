import '@babel/polyfill'
import 'cross-fetch/polyfill'
import {gql} from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase, {userOne} from './utils/seedDatabase'
import getClient from './utils/getClient'
import {getProfile, getUsers, login, createUser} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

describe('AUTHENTICATION testing', () => {
    test('should not login with bad credentials', async() => {
        const variables = {
            email: "caro@gmail.com",
            password: "abccd1234"
        }
        await expect(client.mutate({mutation: login, variables})).rejects.toThrow()
    })

})

describe('MUTATION testing', () => {
    test('should create a new user', async() => {
        const variables = {
            data: {
                name: "chris",
                email: "chris@gmail.com",
                password: "1234ABCD"
            }
        }
    
        const res = await client.mutate({
            mutation: createUser,
            variables
        })
    
        const userExists = await prisma.exists.User({id: res.data.createUser.user.id})
        expect(userExists).toBe(true)    
    })

    test('should not singup with a short password', async() => {
        const variables = {
            name: "eliott",
            email: "eliott@gmail.com",
            password: "1234"
        }
        
    await expect(client.mutate({mutation: createUser, variables})).rejects.toThrow()
    })
})


describe('QUERY testing', () => {
    test('should expose public author profile', async() => {
       
        const res = await client.query({query: getUsers})

        expect(res.data.users.length).toBe(2)
        expect(res.data.users[0].email).toBe(null)
        expect(res.data.users[0].name).toBe("caro")
    })
    test('Should fetch user profile', async() => {
        const client = getClient(userOne.jwt)
        
        const {data} = await client.query({query: getProfile})
        expect(data.me.id).toBe(userOne.user.id)
        expect(data.me.name).toBe(userOne.user.name)
        expect(data.me.email).toBe(userOne.user.email)
    })
})