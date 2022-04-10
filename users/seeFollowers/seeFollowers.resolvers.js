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
			const followers = await client.user
				.findUnique({
					where: {
						username,
					},
				})
				/**
				 *  offset pagination
				 *  Offset pagination은 건너뛰기 및 가져오기를 사용하여 특정 수의 결과를 건너뛰고 제한된 범위를 선택합니다.
				 */
				.followers({
					take: 5,
					skip: (page - 1) * 5,
				});
			const totalFollwers = await client.user.count({
				where: { following: { some: { username } } },
			});
			return {
				ok: true,
				followers,
				totalPages: Math.ceil(totalFollwers / 5),
			};
		},
	},
};
