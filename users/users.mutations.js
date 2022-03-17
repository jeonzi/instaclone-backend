import client from "../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ firstName, lastName, username, email, password }
		) => {
			/**
			 * db에서 username @unique로 중복 username에러를 체크해주지만
			 * db단에서의 에러 체크는 정말 최후에 하는 것으로 db에 데이터 저장하기 전에 무조건 에러 체크를 해주어야 한다.
			 * 1. check if username or email are already on DB.
			 * 2. hash password
			 * 3. save and return new user
			 */

			// check username or email on DB
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
			console.log(exsitingUser);
		},
	},
};
