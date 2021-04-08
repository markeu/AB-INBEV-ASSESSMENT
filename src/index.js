require("dotenv").config();
const express = require("express");
const session = require("express-session");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const formData = require("express-form-data");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const { env } = require("./configs");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.set("trust proxy", 1);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);
app.use(formData.parse());
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(
    session({
        secret: env.secret,
        resave: true,
        saveUninitialized: true,
    })
);


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "AB-INBEV-ASSESSMENT SHAPE AREA API",
            description: "AB-INBEV-ASSESSMENT DOCS",
        },
        servers: ["http://localhost:5000"]
    },
    apis: ['src/routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve);
app.get(
    '/api-docs',
    swaggerUi.setup(swaggerDocs, {
        explorer: true,
    })
);
app.use("", routes);

let Server = server.listen(port, () => {
    console.log(
        `Service is running on http://localhost:${Server.address().port}`
    );
});

module.exports = server