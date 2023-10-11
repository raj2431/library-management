const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    dotEnv.config();
}


module.exports = {
    db: {
        url: process.env.DB_URL,
        pagination: {
            limit: 50,
        }
    },
    port: process.env.PORT,
    app_secret: process.env.APP_SECRET,
};