import jwt from 'jsonwebtoken' 

const generateToken = (id) => {
    return jwt.sign({userId}, 'supersecretWhouhou', {expiresIn: '7 days'})
}

export default generateToken