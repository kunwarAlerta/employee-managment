const express = require("express");
const morgan = require("morgan");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socket = require("./sockets/index");

const app = express();
const handleErrorsApi = require("./middleware/errors/handleErrorsApi");
const connection = require("./db/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));


app.use("/api/v1", require("./v1/routes/frontend"));
app.use("/api/v1/panel", require("./v1/routes/panel"));

app.use(handleErrorsApi);
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "./uploads/")));
app.use(express.static(path.join(__dirname, 'client-app/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-app/build'))
})

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const server = http.createServer(app);
const io = require("socket.io")(server);

socket(io);

server.listen(process.env.PORT || config.get("port"), async () => {
  console.log(`Node env :${process.env.NODE_ENV}.`);
  console.log(`Server Running on port: ${config.get("port")}.`);
  await connection.mongoDbconnection();
});
