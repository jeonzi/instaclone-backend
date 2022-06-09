import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		followUser: protectedResolver(
			async (_, { username }, { loggedInUser }) => {
				const exsitingUser = await client.user.findUnique({
					where: { username },
				});

				if (!exsitingUser) {
					return {
						ok: false,
						error: "That user does not exsit. Can't follow",
					};
				}
				await client.user.update({
					where: {
						id: loggedInUser.id,
					},
					data: {
						following: {
							connect: {
								//unique 한 속성이어야 함
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
