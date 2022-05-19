import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
	Mutation: {
		editComment: protectedResolver(
			async (_, { id, comment }, { loggedInUser }) => {
				const payload = await client.comment.findUnique({
					where: {
						id,
					},
					select: {
						userId: true,
					},
				});

				if (!payload) {
					return {
						ok: false,
						error: "Comment not found",
					};
				} else if (payload.userId !== loggedInUser.id) {
					console.log(comment.userId);
					console.log(loggedInUser.id);
					return {
						ok: false,
						error: "Not authorized.",
					};
				} else {
					await client.comment.update({
						where: {
							id,
						},
						data: {
							comment,
						},
					});
					return {
						ok: true,
					};
				}
			}
		),
	},
};
