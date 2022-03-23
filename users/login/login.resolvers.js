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
					error: "Please check your password 🙏🏻",
				};
			}

			// issue a token and send it to the user
			// token은 누구든 접근할 수 있기 때문에 비밀을 담는게 아니다!!
			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
		},
	},
};
