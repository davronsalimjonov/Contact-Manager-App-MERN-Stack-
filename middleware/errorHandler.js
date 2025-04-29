import { statusCodes } from "../constants.js"

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); 
    }

    const statusCode = err.statusCode || 500

    if (statusCode === statusCodes.VALIDATION_ERROR) {
        res.status(400).json({ title: "Validation Failed", message: err.message, stackTrace: err.stack })
    } else if (statusCode === statusCodes.UNAUTHORIZED) {
        res.status(401).json({ title: "Unauthorized", message: err.message, stackTrace: err.stack })
    } else if (statusCode === statusCodes.FORBIDDEN) {
        res.status(403).json({ title: "Forbidden", message: err.message, stackTrace: err.stack })
    } else if (statusCode === statusCodes.NOT_FOUND) {
        res.status(404).json({ title: "Not Found", message: err.message, stackTrace: err.stack })
    } else if (statusCode === statusCodes.SERVER_ERROR) {
        res.status(500).json({ title: "Server Error", message: err.message, stackTrace: err.stack })
    } else {
        res.status(statusCode).json({ title: "Error", message: err.message, stackTrace: err.stack })
    }
}

export default errorHandler
