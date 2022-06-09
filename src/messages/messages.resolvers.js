import client from "../client";

export default {
	ChatRoom: {
		users: ({ id }) => client.chatRoom.findUnique({ where: { id } }).users(),
		messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
		unreadTotal: ({ id }, _, { loggedInUser }) => {
			if (!loggedInUser) {
				return 0;
			} else {
				return client.message.count({
					// 누가 방을 보고 있느냐가 중요
					// 내가 생성하지 않은 매세지, 즉 상대방이 보낸 메세지 중 읽지 않은 것만 count하는 것
					where: {
						read: false,
						roomId: id,
						user: {
							id: {
								not: loggedInUser.id,
							},
						},
					},
				});
			}
		},
	},
};
