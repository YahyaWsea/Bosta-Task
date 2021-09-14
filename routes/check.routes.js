const express = require('express');

const checkRouter = express.Router();

const controller = require('../controllers/check.controller');
const authMiddleware = require('../middleware/authMiddleware');

const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const { openapi } = require('../swagger/swaggerConfig');

/**
 * @openapi
 *  tags:
 *    name: "Check"
 *    description: "All operations required for Checks"
 */

/**
 * @openapi
 *  paths:
 *     /check:
 *      post:
 *         tags:
 *         - "Check"
 *         summary: "Add New Check"
 *         description: ""
 *         operationId: "addCheck"
 *         consumes:
 *         - "application/json"
 *         - "application/xml"
 *         produces:
 *         - "application/xml"
 *         - "application/json"
 *         parameters:
 *         - in: "body"
 *           name: "body"
 *           description: "Check object that needs to be added"
 *           required: true
 *           schema:
 *             $ref: "#/components/schemas/Check"
 */

checkRouter.post('/', authMiddleware, asyncTryCatch(controller.createCheck));

/**
 * @openapi
 *  paths:
 *     /check:
 *      get:
 *         tags:
 *         - "Check"
 *         summary: "Get all checks"
 *         description: ""
 *         operationId: "getCheck"
 *         consumes:
 *         - "application/json"
 *         - "application/xml"
 *         produces:
 *         - "application/xml"
 *         - "application/json"
 *         responses:
 *           "200":
 *             description: "successful operation"
 *             schema:
 *               type: "array"
 *               items:
 *                 $ref: "#/definitions/Check"
 *
 *
 */
checkRouter.get('/', authMiddleware, asyncTryCatch(controller.getChecks));
checkRouter.put('/:id', authMiddleware, asyncTryCatch(controller.updateCheck));
checkRouter.delete('/:id', authMiddleware, asyncTryCatch(controller.deleteCheck));
checkRouter.get('/report', authMiddleware, asyncTryCatch(controller.report));

module.exports = checkRouter;
