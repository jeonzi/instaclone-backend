import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword },
			{ loggedInUser, protectResolver } // context에서 오는 것
		) => {
			// 로그인한 사용자가 아닌 경우
			protectResolver(loggedInUser);

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
