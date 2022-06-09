import client from "../../client";

export default {
	Query: {
		seeFollowers: async (_, { username, page }) => {
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
			/** Offset Pagination
			 *  특정 페이지로 건너뛰기 및 가져오기에 유용, 규모가 커지면 감당하기 힘들어짐
			 */
			const followers = await client.user
				.findUnique({
					where: {
						username,
					},
				})
				.followers({
					take: 5,
					skip: (page - 1) * 5,
				});
			const totalFollowers = await client.user.count({
				where: { following: { some: { username } } },
			});
			return {
				ok: true,
				followers,
				totalPages: Math.ceil(totalFollowers / 5),
			};
		},
	},
};
