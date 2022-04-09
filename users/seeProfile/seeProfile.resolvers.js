import client from "../../client";

export default {
	Query: {
		seeProfile: (_, { username }, context, info) =>
			client.user.findUnique({
				where: {
					username,
				},
				include: {
					// prisma client가 반환하는 결과에 사용자가 원하는 relation을 보여줌
					following: true,
					followers: true,
				},
			}),
	},
};
