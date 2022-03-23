import client from "../client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default {
	Mutation: {
		createAccount: async (
			_,
			{ firstName, lastName, username, email, password }
		) => {
			/**
			 * db에서 username @unique로 중복 username에러를 체크해주지만
			 * db단에서의 에러 체크는 정말 최후에 하는 것으로 db에 데이터 저장하기 전에 무조건 에러 체크를 해주어야 한다.
			 * 1. check if username or email are already on DB.(using prismaClient filter)
			 * 2. hash password
			 * 3. save and return new user
			 */
			try {
				const exsitingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								username, // username: username의 축약형
							},
							{
								email,
							},
						],
					},
				});
				// console.log(exsitingUser);

				if (exsitingUser) {
					throw new Error("This username/email is already taken :(");
				}

				const hashingPassword = await bcrypt.hash(password, 10);

				const user = await client.user.create({
					data: {
						firstName,
						lastName,
						username,
						email,
						password: hashingPassword,
					},
				});
				return user;
			} catch (e) {
				return e;
			}
		},

		login: async (_, { username, password }) => {
			// find user with args.username
			const user = await client.user.findFirst({ where: { username } });
			if (!user) {
				return { ok: false, error: "User not found" };
			}

			// check password with args.password
			const chkPassword = await bcrypt.compare(password, user.password);
			if(!chkPassword){
				return {
					ok: false,
					error: "Please check your password 🙏🏻"
				};
			}

			// issue a token and send it to the user
			// token은 누구든 접근할 수 있기 때문에 비밀을 담는게 아니다!!
			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token
			}
		},
	},
};
