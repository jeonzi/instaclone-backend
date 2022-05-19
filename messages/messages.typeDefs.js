import { gql } from "apollo-server-express";

export default gql`
	type Message {
		id: Int!
		payload: String!
		user: User!
		chatRoom: ChatRoom!
		createdAt: String!
		updatedAt: String!
	}

	type ChatRoom {
		id: Int!
		user: [User]
		messages: [Message]
		createdAt: String!
		updatedAt: String!
	}
`;
