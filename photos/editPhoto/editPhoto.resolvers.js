import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

export default {
	Mutation: {
		editPhoto: protectedResolver(
			async (_, { id, caption }, { loggedInUser }) => {
				const photo = await client.photo.findFirst({
					where: {
						id,
						userId: loggedInUser.id,
					},
					include: {
						hashtags: {
							select: {
								hashtag: true,
							},
						},
					},
				});
				if (!photo) {
					return {
						ok: false,
						error: "Photo not found",
					};
				}
				const newphoto = await client.photo.update({
					where: {
						id,
					},
					data: {
						caption,
						hashtags: {
							disconnect: photo.hashtags, // disconnect : 중첩된 disconnect 쿼리는 상위 레코드와 관련 레코드 간의 연결을 끊지만 두 레코드를 삭제하지는 않고 관계가 있는 필드와 연결을 끊는다
							connectOrCreate: processHashtags(caption),
						},
					},
				});
				console.log(newphoto);
			}
		),
	},
};
