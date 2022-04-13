import { argsToArgsConfig } from "graphql/type/definition";
import client from "../client";

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
	},
	Hashtag: {
		photos: ({ id }, { page }) => {
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
