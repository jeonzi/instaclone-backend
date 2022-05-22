import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
	Mutation: {
		readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
			// 1. 내가 보낸 메세지가 아닌 걸 확인
			const message = await client.message.findFirst({
				where: {
					id,
					userId: {
						not: loggedInUser.id,
					},
					chatRoom: {
						users: {
							some: {
								id: loggedInUser.id,
							},
						},
					},
				},
				select: {
					id: true,
				},
			});
			if (!message) {
				return {
					ok: false,
					error: "Message not found",
				};
			}

			await client.message.update({
				where: {
					id,
				},
				data: {
					read: true,
				},
			});

			return {
				ok: true,
			};
		}),
	},
};
