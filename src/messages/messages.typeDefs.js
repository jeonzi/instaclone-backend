import { gql } from "apollo-server-express";

export default gql`
	type Message {
		id: Int!
		payload: String!
		user: User!
		chatRoom: ChatRoom!
		read: Boolean!
		createdAt: String!
		updatedAt: String!
	}

	type ChatRoom {
		id: Int!
		unreadTotal: Int!
		users: [User]
		messages: [Message]
		createdAt: String!
		updatedAt: String!
	}
`;
