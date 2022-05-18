export default {
	Comment: {
		isMine: ({ userId }, _, { loggedInUser }) => {
			// loggedInUser가 null일 수 있으니까 error 체크 해줘야함
			if (!loggedInUser) {
				return false;
			}
			return userId === loggedInUser;
		},
	},
};
