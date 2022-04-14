import client from "../../client";

export default {
	Query: {
		searchPhotos: (_, { keyword, lastId }) => {
			const photos = client.photo.findMany({
				where: {
					caption: {
						startsWith: keyword,
					},
				},
				take: 5,
				skip: lastId ? 1 : 0,
				...(lastId && { cursor: { id: lastId } }),
			});
			return photos;
		},
	},
};
