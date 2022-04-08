import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
	_,
	{
		firstName,
		lastName,
		username,
		email,
		password: newPassword,
		bio,
		avatarURL,
	},
	{ loggedInUser } // context 에서 오는 것
) => {
	//readStream을 writeStream으로 Pipe로 연결(router가 경로를 읽지 못함...)
	const { filename, createReadStream } = await avatarURL;
	const readStream = createReadStream();
	const writeStream = createWriteStream(
		process.cwd() + "/uploads/" + filename
	);
	readStream.pipe(writeStream);

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
			avatarURL,
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
