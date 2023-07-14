import basicInfo from "./basicInfo"
import components from "./components";
import notification from "./notification";

const swaggerDocs = {
    ...basicInfo,
    ...components,
    paths: {
        ...notification.paths
    }
};

export default swaggerDocs