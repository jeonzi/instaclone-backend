import { gql } from "apollo-server-express";

export default gql`
	type Photo {
		id: Int!
		user: User!
		file: String!
		caption: String
		hashtags: [Hashtag]
		createdAt: String!
		updatedAt: String!
		likeNum: Int!
	}

	type Hashtag {
		id: Int!
		hashtag: String!
		photos(page: Int!): [Photo]
		totalPhotos: Int!
		createdAt: String!
		updatedAt: String!
	}

	type Like {
		id: Int!
		photo: Photo!
		createdAt: String!
		updatedAt: String!
	}
`;

// Hashtag는 photo 없이 존재할 수 없기 때문에 photo에 의존성이 높다.
// photo 모듈 안에 hashtag를 포함시켜놓고 나중에 분리해도 된다.
// 마찬가지로 comment는 사진 없이 존재할 수 없으므로 photo 모듈 안에 포함한다.
// Like 의 경우는 photo가 아닌 comment에도 가능하니 다른 모듈로 분리해주는 게 좋다.
