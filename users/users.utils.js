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

// 로그인한 유저가 아닌 경우에 대비해 resolver를 보호해야함. (여러 resolver 안에서 각각 user 인증하는 하드코딩을 방지)
// currying
// 함수 리턴값으로 함수를 호출하는 것
// protectResolver에서 graphql resolver 를 부르는 것
export const protectedResolver =
	(ourResolver) => (root, args, context, info) => {
		if (!context.loggedInUser) {
			return {
				ok: false,
				error: "Please login to perform this action🙏🏻",
			};
		}
		return ourResolver(root, args, context, info);
	};
