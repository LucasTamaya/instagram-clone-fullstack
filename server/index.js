const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const schema = require("./src/schema/schema");
const mongoDbConnection = require("./src/config/mongoDbConnection");
const SESSION_SECRET = "fae54geFEFGaeg5454Agaegae545kutlutl54jth45g55faef";

mongoDbConnection();

const store = new MongoDBSession({
  uri: process.env.MONGODB_URI + "&w=majority",
  collection: "sessions",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(
  "/graphql",
  graphqlHTTP((req, res, next) => ({
    schema,
    graphiql: true,
    context: { req, res, next },
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
