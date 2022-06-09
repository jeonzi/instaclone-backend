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
// Mutation의 경우에는 return {ok, error}가 형태로 return 되는 것이 옳지만, seeFeed Query Resolver의 경우 return type이 array 형태이므로 맞지 않는다.
// => info의 operation의 operation에서 요청하는 것이 query, muation인지 구별하여 return 타입 지정하므로서 에러 방지가 가능하다.

// currying
// 함수 리턴값으로 함수를 호출하는 것
// protectResolver에서 graphql resolver 를 부르는 것
export const protectedResolver =
	(ourResolver) => (root, args, context, info) => {
		if (!context.loggedInUser) {
			const query = info.operation.operation === "query";
			if (query) {
				return null;
			} else {
				return {
					ok: false,
					error: "Please login to perform this action🙏🏻",
				};
			}
		}
		return ourResolver(root, args, context, info);
	};
