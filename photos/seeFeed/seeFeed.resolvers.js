import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
	Query: {
		seeFeed: protectedResolver((_, __, { loggedInUser }) =>
			// Follower 목록에 내 아이디가 있는 유저들의 photo를 찾고, 내가 만든 photo를 가져온다 (OR로 연결)
			client.photo.findMany({
				where: {
					OR: [
						{
							user: {
								followers: {
									some: {
										id: loggedInUser.id,
									},
								},
							},
						},
						{
							userId: loggedInUser.id,
						},
					],
				},
				orderBy: {
					createdAt: "desc",
				},
			})
		),
	},
};
