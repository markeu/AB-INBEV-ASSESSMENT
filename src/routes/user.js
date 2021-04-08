const { Router } = require("express");
const { user } = require("../controllers");

const routes = Router();

routes.post("/signup", user.createUser);
routes.post("/login", user.login);
// routes.get("/userInterest", userInterest.getAllUserInterests)
// routes.delete("/deleteUserInterest", userInterest.truncateUserInterestById)

module.exports = routes;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: End-user retrieval and access
 */

/**
 * @swagger
 * paths:
 *  /postUserInterest:
 *    post:
 *      summary:  User can select one or multiple interests
 *      description: user can select interests
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: userId
 *          schema:
 *            type: string
 *            required:
 *              - userId
 *            properties:
 *              userId:
 *                type: string
 *                description: A valid authenticated user ID
 *            example:  0045dfa3-9829-4e21-b3fc-6888cf46daee
 *        - in: body
 *          name: post-interest
 *          schema:
 *            type: object
 *            required:
 *              - data
 *            properties:
 *              data:
 *                type: array
 *            example:
 *              data: ["6ee23960-cb5e-435f-83ab-738cc2e80768", "cf1d2c61-3f28-4190-ad6c-dbb131653d76"]
 *      responses:
 *        "201":
 *          description: A successful response
 */
/**
 * @swagger
 * paths:
 *  /userInterest:
 *    get:
 *      summary: Retrieve user Interests.
 *      description: Get all user interests using the intrestId as query params
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: UserId
 *          schema:
 *            type: string
 *            description: Valid auth user id
 *            example: 0045dfa3-9829-4e21-b3fc-6888cf46daee
 *      responses:
 *        "200":
 *          description: A successful response
 */
/**
 * @swagger
 * paths:
 *  /deleteUserInterest:
 *    delete:
 *      summary: Delete a specific User Interest.
 *      description: User delete a specific user interest
 *      tags: [Users]
 *      parameters:
 *        - in: body
 *          name: id
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *            description: Valid user interest id
 *            example:
 *              id: 0045dfa3-9829-4e21-b3fc-6888cf46daee
 *      responses:
 *        "200":
 *          description: A successful response
 */