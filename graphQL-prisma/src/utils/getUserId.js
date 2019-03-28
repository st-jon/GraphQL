import jwt from 'jsonwebtoken'

export default (request) => {
    const header = request.request.headers.authorization

    if (!header) {
        throw new Error('Authentication failed')
    }
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'supersecretWhouhou')

    return decoded.userId
}