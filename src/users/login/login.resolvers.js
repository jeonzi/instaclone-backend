import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		login: async (_, { username, password }) => {
			// find user with args.username
			const user = await client.user.findFirst({ where: { username } });
			if (!user) {
				return { ok: false, error: "User not found" };
			}

			// check password with args.password
			const chkPassword = await bcrypt.compare(password, user.password);
			if (!chkPassword) {
				return {
					ok: false,
					error: "Please check your password ๐๐ป",
				};
			}

			// issue a token and send it to the user
			// token์ ๋๊ตฌ๋  ์ ๊ทผํ  ์ ์๊ธฐ ๋๋ฌธ์ ๋น๋ฐ์ ๋ด๋๊ฒ ์๋๋ค!!
			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
		},
	},
};
