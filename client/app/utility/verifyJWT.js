const jwt = require('jsonwebtoken');

export default async function verifyJWT(token) {

    const secretKey = process.env.JWT_KEY;
    const parsedToken = token.JWT
    console.log(parsedToken)
    // Verify the JWT token
    jwt.verify(parsedToken, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification failed: ', err.message);
    } else {
      // Decoded payload
      console.log('Decoded payload: ', decoded);
      return decoded;
    }
    }) 
   
}