import cors from "cors";
import { ORIGIN, PORT, NODE_ENV } from "../config";
import logger from "../utils/logger.utils";
import createServer from "../utils/server.utils";
import connect from "../utils/db.utils";


const app = createServer();

app.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

app.listen(PORT, async () => {
    console.log(PORT)
    logger.info(
        `${NODE_ENV.toUpperCase()} Api is running at http://localhost:${PORT}`
    );

    await connect();
});