import client from "../client";

export default {
	Room: {
		users: ({ id }) => client.chatRoom.findUnique({ where: { id } }).users(),
		messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
		unreadTotal: () => 0,
	},
};
