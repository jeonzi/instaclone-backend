/**
 * apllo server setting
 * 이전에는 graphql-yoga를 사용하여 apollo 서버 세팅을 하고 구동햇지만
 * 지금은 ApolloSever 자체에서 제공하는 기능들이 워낙 편리해서 이번에는 ApolloServer를 사용함
 * */

require("dotenv").config();
import { ApolloServer } from "apollo-server";
// ApolloServerPluginLandingPageGraphQLPlayground 해당코드가 없으면 server.js 를 실행하면 Playground가 아니라 apollo sandbox로 이동(apollo sever 3)
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.DEV_PORT;

// context는 모든 resolver에서 접근 가능한 정보를 넣을 수 있는 object이다.
// context는 function이 될 수도 있다.
const server = new ApolloServer({
	schema,
	// context가 token을 받는게 아니라 utils의 user를 받게 설정해준다.
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
		};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
	.listen()
	.then(() =>
		console.log(`ApolloServer is running on http://localhost:${PORT}/`)
	);
