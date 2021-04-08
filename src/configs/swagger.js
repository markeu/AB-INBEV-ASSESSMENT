const swaggerJsDoc = require("swagger-jsdoc");

const { port } = require("./env");

const swagger = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "AB-INBEV assesment API Docs",
            description: "Shape Area API.",
            contact: { name: "Uche Mark" },
            servers: [{ url: `http://localhost:${port}` }],
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                }
            },
            security: {
                bearerAuth: []
            }
        }
    },
    apis: ["./src/docs.yml"],
};

module.exports = swaggerJsDoc(swagger);