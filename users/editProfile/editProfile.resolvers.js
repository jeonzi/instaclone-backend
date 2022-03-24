import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword },
			{ loggedInUser } // context의  req.headers.token에서 받아오는 것
		) => {
			// 사용자가 mutation과 query에 매번 token을 보내는 것은 좋지 않다. -> 토큰을 자동으로 보내주자 -> HTTP HEADERS에 넣어서
			console.log(loggedInUser);
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
		},
	},
};
