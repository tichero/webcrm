/* eslint-disable no-console */
const express = require("express");
const history = require("connect-history-api-fallback");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const open = require("open");
const host = require("../host");
const API = require("./api");
const CopyDatabase = require("./copyDb");

const staticFiles = express.static(path.join(__dirname, '../', "dist"));


let homePath = null;
process.platform === "win32"
  ? (homePath = path.join(path.dirname(require("os").homedir()), "Public"))
  : (homePath = require("os").homedir());


CopyDatabase(homePath);


const app = express();
app.use(bodyParser.json());
app.use(cors());

API(app, homePath);


// app.use(helmet());
// app.use(helmet.noCache());
app.use(staticFiles);
app.use(history());

const port = 6700;

// open browser
(async () => {
  await open(`http://${host}:${port}/`);
})();

app.listen(port, host);
app.use(staticFiles)
console.log(`App is listening on port ${port}`);