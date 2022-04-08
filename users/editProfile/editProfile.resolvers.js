import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
	_,
	{ firstName, lastName, username, email, password: newPassword, bio },
	{ loggedInUser } // context 에서 오는 것
) => {
	let uglyPassword = null;
	if (newPassword) {
		uglyPassword = await bcrypt.hash(newPassword, 10);
	}

	const updatedUser = await client.user.update({
		where: { id: loggedInUser.id },
		data: {
			firstName,
			lastName,
			username,
			email,
			...(uglyPassword && { password: uglyPassword }), // hashPassword true -> password: hashPassword(es6문법)
			bio,
		},
	});

	if (updatedUser) {
		return {
			ok: true,
		};
	} else {
		return {
			ok: false,
			error: "Could not update your profile",
		};
	}
};

export default {
	Upload: GraphQLUpload,
	Mutation: {
		editProfile: protectedResolver(resolverFn),
	},
};
