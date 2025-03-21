import type { User } from "@/api/user/userModel";
import { logger } from "@/server";

// Mock database - in a real app, this would be your database connection
const users: User[] = [
	{
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		age: 42,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
	{
		id: 2,
		name: "Robert",
		email: "Robert@example.com",
		age: 21,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
];

export class UserService {
	async findAll(): Promise<User[]> {
		try {
			return users;
		} catch (ex) {
			logger.error(`Error finding all users: ${(ex as Error).message}`);
			throw ex;
		}
	}

	async findById(id: number): Promise<User | null> {
		try {
			return users.find((u) => u.id === id) || null;
		} catch (ex) {
			logger.error(`Error finding user with id ${id}: ${(ex as Error).message}`);
			throw ex;
		}
	}
}

export const userService = new UserService();
