import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
	try {
		if (!token) {
			return null;
		}
		const { id } = await jwt.verify(token, process.env.SECRET_KEY);
		const user = await client.user.findUnique({ where: { id } });
		if (user) {
			return user;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};

// 로그인한 유저가 아닌 경우에 대비해 resolver를 보호해야함.
export const protectResolver = (user) => {
	if (!user) {
		return {
			ok: false,
			error: "You need to login",
		};
	}
};
