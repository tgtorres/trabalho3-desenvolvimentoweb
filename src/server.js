const express = require('express');
require('express-async-errors');
const Youch = require('youch');
const mongoose = require('mongoose');
const requireDir = require("require-dir");
const Sentry = require("@sentry/node");
const sentryConfig = require('./config/sentry');

// Iniciando o DB
const app = express();
app.use(express.json());
Sentry.init(sentryConfig);

mongoose.connect(
    "mongodb://localhost:27017/trabalho",
    { useNewUrlParser: true }
);

requireDir('./models');

// Manipulador de requisições
app.use(Sentry.Handlers.requestHandler());
// Rotas
app.use("/api", require("./routes"));
// Manipulador de erros
app.use(Sentry.Handlers.errorHandler());

app.use(async (err, req, res, next) => {
    const erros = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
});

app.listen(3001);
