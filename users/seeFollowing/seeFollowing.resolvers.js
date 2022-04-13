export default {
	Query: {
		seeFollowing: async (_, { username, lastId }) => {
			const exsitingUser = await client.user.findUnique({
				where: { username },
				select: { id }, // select: 원하는 특정 필드만 가져오는 기능(최소 하나는 넣어줘야 함)
			});
			if (!exsitingUser) {
				return {
					ok: false,
					error: "User not found",
				};
			}
			/** Cursor pagination
			 * 규모 확장하기가 쉬워짐, 편하지만 특정 페이지로 이동이 불가, 무한스크롤에 적합
			 * cursor : 데이터베이스에 보내는 우리가 본 마지막 데이터 (lastId)
			 */
			const following = await client.user
				.findUnique({
					where: {
						username,
					},
				})
				.following({
					take: 5,
					skip: lastId ? 1 : 0,
					...(lastId && { cursor: { id: lastId } }),
				});
			return {
				ok: true,
				following,
			};
		},
	},
};
