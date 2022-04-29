const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const schema = require("./src/schema/schema");
const mongoDbConnection = require("./src/config/mongoDbConnection");
const SESSION_SECRET = "fae54geFEFGaeg5454Agaegae545kutlutl54jth45g55faef";

mongoDbConnection();

const store = new MongoDBSession({
  uri: "mongodb+srv://lucas_tamaya:Lucas2003@linkedincloneapp.4qysj.mongodb.net/InstagramClone?retryWrites=true&w=majority",
  collection: "sessions",
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      maxAge: 120000,
    },
  })
);

app.use(
  "/graphql",
  bodyParser.json(),
  (req, _, next) => {
    console.log(req.session);
    next();
  },
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { req },
  }))
);

app.get("/", (req, res) => {
  return res.json({ message: "Server is running" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
