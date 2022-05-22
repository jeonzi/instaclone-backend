import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
	Query: {
		seeRoom: protectedResolver((_, { id }, { loggedInUser }) => {
			client.chatRoom.findFirst({
				where: {
					id,
					users: {
						some: {
							id: loggedInUser.id,
						},
					},
				},
				// include: {
				// 	users: true,
				// 	message: true,
				// },
			});
		}),
	},
};
