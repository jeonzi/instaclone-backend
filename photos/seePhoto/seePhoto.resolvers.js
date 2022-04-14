import client from "../../client";

export default {
	Query: {
		seePhoto: (_, { id }) => {
			const photo = client.photo.findUnique({
				where: {
					id,
				},
			});
			console.log(photo);
			return photo;
		},
	},
};
