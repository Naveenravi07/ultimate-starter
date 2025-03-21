import type { ErrorRequestHandler } from "express";
import { HttpError } from '../errors/httpErrors';
import { ControllerResponse } from '../models/controllerResponse';
import { logger } from '@/server';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
	logger.error(err);

	if (err instanceof HttpError) {
		const response = ControllerResponse.failure(err.message, null, err.statusCode);
		res.status(err.statusCode).json(response);
		return next();
	}

	const response = ControllerResponse.failure('Internal Server Error', null, 500);
	res.status(500).json(response);
	return next();
};

export default errorHandler;
