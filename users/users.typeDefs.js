import { gql } from "apollo-server";

/**
 * graphQL에서는 password를 물어보지 않을 것
 * prisma schema랑 똑같아야 함(password 제외)
 */
export default gql`
	type User {
		id: String!
		firstName: String!
		lastName: String
		userName: String!
		email: String!
		createdAt: String!
		updatedAt: String!
	}

	type Query {
		seeProfile(username: String): User
	}

	type Mutation {
		createAccount(
			firstName: String!
			lastName: String
			username: String!
			email: String!
			password: String!
		): User
	}
`;
