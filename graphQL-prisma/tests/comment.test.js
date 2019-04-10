import '@babel/polyfill'
import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost'

import prisma from '../src/prisma'
import seedDatabase, {userOne, postOne, postTwo, commentOne, commentTwo} from './utils/seedDatabase'
import getClient from './utils/getClient'

const client = getClient()

beforeEach(seedDatabase)

describe('MUTATION testoing', () => {
    test('should delete own comment', async () => {
        const client = getClient(userOne.jwt)
        const deleteComment = gql`
            mutation {
                deleteComment(
                    id: "${commentOne.comment.id}"
                ) {
                    id
                }
            }
        `
        await client.mutate({mutation: deleteComment})
        const exists = await prisma.exists.Comment({id: commentOne.comment.id})

        expect(exists).toBe(false)

    })
    test('should not delete other comments', async () => {
        const client = getClient(userOne.jwt)
        const deleteComment = gql`
            mutation {
                deleteComment(
                    id: "${commentTwo.comment.id}"
                ) {
                    id
                }
            }
        `
        await expect(client.mutate({mutation: deleteComment})).rejects.toThrow()
        const exists = await prisma.exists.Comment({id: commentTwo.comment.id})

        expect(exists).toBe(true)
    })
})