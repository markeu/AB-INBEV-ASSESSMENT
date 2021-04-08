const { Router } = require("express");
const { interests } = require("../controllers");
const { validate } = require("../middlewares");
const { interest: validator } = require("../validators");

const routes = Router();

routes.post("/interest", validate(validator), interests.createInterest)
routes.get("/interest", interests.getInterest);
routes.get("/SpecificInterest", interests.getInterestById);
routes.delete("/deleteInterest", interests.truncateInterestById)
routes.patch("/updateInterest", validate(validator), interests.updateInterestById)

module.exports = routes;


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and retrieval
 */

/**
 * @swagger
 * paths:
 *  /interest:
 *    get:
 *      summary: Admin Retrieve all Interests.
 *      description: Get all interests
 *      parameters:
 *       - in: query
 *         name: page
 *         description: current page number
 *       - in: query
 *         name: pageSize
 *         description: number of items per page(optional as the default value *is 4)
 *      tags: [Admin]
 *      responses:
 *        "200":
 *          description: A succeessful response
 */
/**
 * @swagger
 * paths:
 *  /SpecificInterest:
 *    get:
 *      summary: Retrieve a single Interest.
 *      description: Get specific interest using the intrestId as query params
 *      tags: [Admin]
 *      parameters:
 *        - in: query
 *          name: id
 *          description: Valid interest id
 *          schema:
 *            type: string
 *            example: d901ec09-fe44-46fc-838b-e83b86157801
 *      responses:
 *        "200":
 *          description: A successful response
 */
/**
 * @swagger
 * paths:
 *  /interest:
 *    post:
 *      summary:  Admin create an interest
 *      description: Admin create a new interest using the model specs
 *      tags: [Admin]
 *      parameters:
 *        - in: body
 *          name: post-interest
 *          description: Using title and description create a new interest
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *            example:
 *              title: Fashion
 *              description: Every fashion
 *      responses:
 *        "201":
 *          description: A successful response
 */
/**
 * @swagger
 * paths:
 *  /deleteInterest:
 *    delete:
 *      summary: Delete a specific Interest.
 *      description: Admin delete a specific interest from the inventory
 *      tags: [Admin]
 *      parameters:
 *        - in: query
 *          name: id
 *          description: A valid interest id
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *            example: 0045dfa3-9829-4e21-b3fc-6888cf46daee
 *      responses:
 *        "200":
 *          description: A successful response
 */
/**
 * @swagger
 * paths:
 *  /updateInterest:
 *    patch:
 *      summary: Update Interest details.
 *      description: Get specific interests and edit both or individual fields
 *      tags: [Admin]
 *      parameters:
 *        - in: body
 *          name: Patch-body
 *          schema:
 *            type: object
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *          example:
 *            title: string
 *            descriptin: string
 *        - in: query
 *          name: id
 *          description: Valid interest id
 *          schema:
 *            type: string
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *            example: d901ec09-fe44-46fc-838b-e83b86157801
 *      responses:
 *        "200":
 *          description: A successful response
 */