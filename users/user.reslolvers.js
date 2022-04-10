import client from "../client";

export default {
	/** Computed Field
	 *  데이터베이스에 없는 GrqphQL Schema에만 정의된 field, Request될 때마다 계산됨
	 */
	User: {
		totalFollowing: ({ id }) => {
			client.user.count({
				where: {
					// follower 리스트에 내 id가 있는 경우
					followers: {
						some: {
							id,
						},
					},
				},
			});
		},

		totalFollowers: ({ id }) => {
			client.user.count({
				where: {
					// following 리스트에 내 id가 있는 경우
					following: {
						some: {
							id,
						},
					},
				},
			});
		},
		isMe: ({ id }, _, { loggedInUser }) => {
			// root, args, context순서로 써줘야함
			if (!loggedInUser) {
				return false;
			}

			return id === loggedInUser.id;
		},
	},
};
