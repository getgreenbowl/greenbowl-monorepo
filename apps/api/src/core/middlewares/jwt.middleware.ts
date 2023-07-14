import {Jwtinstance}  from "jwt"


const {tokenMiddleWare, generateToken, decodeToken, currentUser} = new Jwtinstance({});

const Session = Object.freeze({
    secure: tokenMiddleWare,
    generateToken,
    currentUser,
    decodeToken
})

export default Session
