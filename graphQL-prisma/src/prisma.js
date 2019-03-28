import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'AZJDH23847283BADSdsjfhshs9128312nsbdqsAUAIZB'
})

export default prisma
