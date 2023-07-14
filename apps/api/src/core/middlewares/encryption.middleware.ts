// import { decrypt, encrypt } from "encryption";
// import { NextFunction, Request, Response } from "express";
// import { APP_SETTINGS } from "../app-settings";
// import skipEncryption from "../utils/skip-encryption.util";

// const encryptionEnabled = () => {
//     let en = APP_SETTINGS.ENCRYPT
//     if(typeof en === 'boolean') {
//         return en
//     }
//     if(typeof en === 'string') {
//         return en === 'true'
//     }
//     return false
// }

// export const decryptIncoming = function (req:Request, _: Response, next: NextFunction) {
//     if(!encryptionEnabled() || ['GET'].includes(req.method) || skipEncryption.includes(req.path)) {
//         return next()
//     }
//     req.body = decrypt(req.body.data);
//     next()
// }

// export const encryptOutgoing = (data: any) => {
//     if(!encryptionEnabled()) {
//         return data
//     }
//     return encrypt(data)
// }
