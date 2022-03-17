/**
 * apllo server setting
 * 이전에는 graphql-yoga를 사용하여 apollo 서버 세팅을 하고 구동햇지만
 * 지금은 ApolloSever 자체에서 제공하는 기능들이 워낙 편리해서 이번에는 ApolloServer를 사용함
 * */

require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import schema from "./schema";
// ApolloServerPluginLandingPageGraphQLPlayground 해당코드가 없으면 server.js 를 실행하면 Playground가 아니라 apollo sandbox로 이동(apollo sever 3)

const PORT = process.env.DEV_PORT;
const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
	.listen()
	.then(() =>
		console.log(`ApolloServer is running on http://localhost:${PORT}/`)
	);
