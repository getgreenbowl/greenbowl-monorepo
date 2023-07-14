import { APP_SETTINGS } from "../core/app-settings";

const serverInfo = {
    servers:[
        {
            url:`http://${APP_SETTINGS.NODE_HOST}:${APP_SETTINGS.PORT}`,
            description:"Local server"
        },
    ]
}

export default serverInfo