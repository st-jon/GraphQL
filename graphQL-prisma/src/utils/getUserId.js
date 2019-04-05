import jwt from 'jsonwebtoken'

export default (request, requireAuth = true) => {

    console.log(request)
    const header = request.request ? request.request.headers.authorization : request.connection.context.authorization
    console.log(header)
    if (header) {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'supersecretWhouhou')
    
        return decoded.userId
    }
    if (requireAuth) {
        throw new Error('Authentication failed')
    }

    return null 
}