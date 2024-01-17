const constants = require("../constants");
const resHndlr = require("../handlers/responseHandler");
const joi = require("joi");

// Pagination Validation
async function validatePagination(req, res, next) {
    try {
        const schema = joi.object({
            page: joi.number().required().messages({
                "number.empty": constants.MESSAGE.pageNoEmpty,
                "any.required": constants.MESSAGE.pageNoEmpty,
            }),
            count: joi.number().required().messages({
                "number.empty": constants.MESSAGE.countEmpty,
                "any.required": constants.MESSAGE.countEmpty,
            }),
        });
        await schema.validateAsync(req.query, { allowUnknown: true });
        next();
    } catch (error) {
        validationErrorHandler(res, error);
    }
}

// Error Handle
function validationErrorHandler(res, error) {
    console.log("Pagination Validation Error: ", error)
    resHndlr.sendError(
        res,
        resHndlr.requestResponse(
            constants.CODE.BadRequest,
            error.details
                ? error.details[0].message
                : "There is some issue in validation.",
            {}
        )
    );
}

module.exports = {
    validatePagination
}