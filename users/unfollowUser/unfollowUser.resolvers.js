import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		unfollowUser: protectedResolver(
			async (_, { username }, { loggedInUser }) => {
				const exsitingUser = await client.user.findUnique({
					where: { username },
				});
				if (!exsitingUser) {
					return {
						ok: false,
						error: "Cannot unfollow user.",
					};
				}

				await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						following: {
							// 절대 follower를 직접 바꾸지 않는다!!
							disconnect: {
								username,
							},
						},
					},
				});
				return {
					ok: true,
				};
			}
		),
	},
};
