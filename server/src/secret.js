require("dotenv").config();

const serverPort = process.env.PORT || process.env.SERVER_PORT || 4000;
const mongooseUrl = process.env.MONGOOSE_ATLAS_URL;

module.exports = { serverPort, mongooseUrl };
