import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword }
		) => {
			let uglyPassword = null;
			if (newPassword) {
				uglyPassword = await bcrypt.hash(newPassword, 10);
			}

			const updatedUser = await client.user.update({
				where: { id: 1 },
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
