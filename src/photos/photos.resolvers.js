import client from "../../client";

export default {
	Photo: {
		// Compute Field
		user: ({ userId }) => {
			return client.user.findUnique({ where: { id: userId } });
		},
		hashtags: ({ id }) =>
			client.hashtag.findMany({
				where: {
					photos: {
						some: {
							id,
						},
					},
				},
			}),
		likeNum: ({ id }) => client.like.count({ where: { photoId: id } }),
		comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
		isMine: ({ userId }, _, { loggedInUser }) => {
			// loggedInUser가 null일 수 있으니까 error 체크 해줘야함
			if (!loggedInUser) {
				return false;
			}
			return userId === loggedInUser.id;
		},
	},
	Hashtag: {
		photos: ({ id }, { page }, { loggedInUser }) => {
			return client.hashtag
				.findUnique({
					where: {
						id,
					},
				})
				.photos();
		},
		totalPhotos: (
			{ id },
			{ loggedInUser } // 부분적으로 protect할 수도 있다
		) =>
			client.photo.count({
				where: {
					hashtags: {
						some: {
							id,
						},
					},
				},
			}),
	},
};
