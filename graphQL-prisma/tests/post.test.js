import '@babel/polyfill'
import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase, {userOne, postOne, postTwo} from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

describe('QUERY testing', () => {
  
    test('should expose posts', async() => {
        const getPosts = gql`
            query {
                posts {
                    id
                    title
                    body
                    published
                }
            }
        `
        const res = await client.query({query: getPosts})

        expect(res.data.posts.length).toBe(1)
        expect(res.data.posts[0].published).toBe(true)
    })
    test('Should fetch my posts', async() => {
        const client = getClient(userOne.jwt)
        const getMyPosts = gql`
            query {
                myPosts {
                    id
                    title
                    body
                    published
                }
            }
        `
        const {data} = await client.query({query: getMyPosts})

        expect(data.myPosts.length).toBe(2)
        expect(data.myPosts[0].title).toBe("published post")
        expect(data.myPosts[1].title).toBe("not Published post")
    })
})

describe('MUTATION testing', () => {
    test('should update my post', async () => {
        const client = getClient(userOne.jwt)
        const updatePost = gql`
            mutation {
                updatePost(
                    id: "${postOne.post.id}",
                    data: {
                        published: false
                    }
                ) {
                    id
                    title
                    body
                    published
                }
            }
        `
        const {data} = await client.mutate({mutation: updatePost})
        const exists = await prisma.exists.Post({id: postOne.post.id, published: false})

        expect(data.updatePost.published).toBe(false)
        expect(exists).toBe(true)
    })
    test('should create a post', async () => {
        const client = getClient(userOne.jwt)
        const createPost = gql`
            mutation {
                createPost(
                    data: {
                        title: "new created post",
                        body: "new something here",
                        published: false
                    }
                ) {
                    id
                    title
                    body
                    published
                }
            }
        `
        const {data} = await client.mutate({mutation: createPost})
        expect(data.createPost.title).toBe('new created post')
    })
    test('should delete a post', async () => {
        const client = getClient(userOne.jwt)
        const deletePost = gql`
            mutation {
                deletePost(
                    id: "${postTwo.post.id}"
                ) {
                    id
                }
            }
        `
        await client.mutate({mutation: deletePost})
        const exists = await prisma.exists.Post({id: postTwo.post.id})

        expect(exists).toBe(false)
    })
})