import {Prisma} from 'prisma-binding'
import {fragmentReplacements} from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: 'AZJDH23847283BADSdsjfhshs9128312nsbdqsAUAIZB',
    fragmentReplacements
})

export default prisma
