import { NextFunction, Request } from "express";
import { success } from "proses-response";
import { Cache } from "../cache/cache-model";

export class Cacher {

static cache(group: string) {
    return async (req: Request, res: any, next: NextFunction) => {
        try {
            const cacheData = await Cache.f_cache(req.originalUrl);
            if(cacheData) {
                const {data, msg} = cacheData;
                return success(res, data, msg)
            }
            const oldSend = res.send;
            res.send = async function(data:any) {
                await Cache.addCache(req.originalUrl, arguments[0], group);
                res.send = oldSend
                oldSend.apply(res, arguments);
            }
            next()
        } catch (error) {
        next();
        }
    }
}


}