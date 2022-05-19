import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
	Query: {
		seeChatRooms: protectedResolver(async (_, __, { loggedInUser }) => {
			const rooms = await client.chatRoom.findMany({
				where: {
					users: {
						some: {
							id: loggedInUser.id,
						},
					},
				},
			});
			return rooms;
		}),
	},
};
