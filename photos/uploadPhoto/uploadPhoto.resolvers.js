import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
	Mutation: {
		uploadPhoto: protectedResolver(
			async (_, { file, caption }, { loggedInUser }) => {
				let hashtagObjs = [];
				if (caption) {
					hashtagObjs = processHashtags(caption);
				}
				const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");

				// get or create Hashtags (connectOrCreate)
				return client.photo.create({
					data: {
						fileUrl,
						caption,
						user: {
							connect: {
								id: loggedInUser.id,
							},
						},
						...(hashtagObjs.length > 0 && {
							hashtags: {
								connectOrCreate: hashtagObjs,
							},
						}),
					},
				});
				// save the photo with the parsed hashtags
				// add the photo to the hashtags
			}
		),
	},
};
