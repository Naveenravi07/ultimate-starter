import type { Request, RequestHandler, Response } from "express";
import { userService } from "@/api/user/userService";
import { ControllerResponse } from "@/common/models/controllerResponse";
import { NotFoundError } from "@/common/errors/httpErrors";

class UserController {
	public getUsers: RequestHandler = async (_req: Request, res: Response) => {
		const users = await userService.findAll();
		if (!users.length) {
			throw new NotFoundError("No users found");
		}
		const response = ControllerResponse.success("Users found", users);
		res.status(response.statusCode).json(response);
	};

	public getUser: RequestHandler = async (req: Request, res: Response) => {
		const id = Number.parseInt(req.params.id as string, 10);
		const user = await userService.findById(id);
		if (!user) {
			throw new NotFoundError("User not found");
		}
		const response = ControllerResponse.success("User found", user);
		res.status(response.statusCode).json(response);
	};
}

export const userController = new UserController();
