/**
 * @swagger
 * components:
 *   schemas:
 *     Check:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: check name.
 *           example: "check"
 *         url:
 *           type: string
 *           description: url to monitor.
 *           example: "google.com"
 *         protocol:
 *           type: string
 *           description: protocol.
 *           example: "https"
 *         path:
 *           type: string
 *           description: path.
 *           example: "/path"
 *         webHook:
 *           type: string
 *           description: url to receive notifications on.
 *           example: "https://dddddddd.com"
 *         timout:
 *           type: number
 *           description: timeout the request.
 *           example: 3
 *         interval:
 *           type: number
 *           description: time interval to check the url.
 *           example: 5
 *
 *
 *
 *
 *
 *
 *
 *
 * definitions:
 *   Check:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       petId:
 *         type: "integer"
 *         format: "int64"
 *       quantity:
 *         type: "integer"
 *         format: "int32"
 *       shipDate:
 *         type: "string"
 *         format: "date-time"
 *       status:
 *         type: "string"
 *         description: "Order Status"
 *         enum:
 *         - "placed"
 *         - "approved"
 *         - "delivered"
 *       complete:
 *         type: "boolean"
 *         default: false
 */
