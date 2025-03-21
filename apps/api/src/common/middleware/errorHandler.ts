import type { ErrorRequestHandler } from "express";
import { HttpError } from '../errors/httpErrors';
import { ControllerResponse } from '../models/controllerResponse';
import { logger } from '../utils/logger';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	try {
		logger.error({ err }, 'Error occurred');

		if (err instanceof HttpError) {
			const response = ControllerResponse.failure(err.message, null, err.statusCode);
			res.status(err.statusCode).json(response);
			return;
		}

		const response = ControllerResponse.failure('Internal Server Error', null, 500);
		res.status(500).json(response);
	} catch (error) {
		logger.error({ error }, 'Error in error handler');
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
			data: null
		});
	}
};

export default errorHandler;
