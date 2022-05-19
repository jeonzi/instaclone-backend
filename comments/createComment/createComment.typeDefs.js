import { gql } from "apollo-server-express";

export default gql`
	type Mutation {
		createComment(photoId: Int!, comment: String!): MutationResponse!
	}
`;
