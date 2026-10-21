const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const serverPort = process.env.PORT || process.env.SERVER_PORT || 4000;
const mongooseUrl = process.env.MONGOOSE_ATLAS_URL;

module.exports = { serverPort, mongooseUrl };
