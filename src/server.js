/**
 * apllo server setting
 * 이전에는 graphql-yoga를 사용하여 apollo 서버 세팅을 하고 구동햇지만
 * 지금은 ApolloSever 자체에서 제공하는 기능들이 워낙 편리해서 이번에는 ApolloServer를 사용함
 * */

require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import express from "express";
import looger from "morgan";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const PORT = process.env.DEV_PORT;

// 사용자가 mutation과 query에 매번 token을 보내는 것은 좋지 않다. -> 토큰을 자동으로 보내주자 -> HTTP HEADERS에 넣어서
// context는 모든 resolver에서 접근 가능한 정보를 넣을 수 있는 object이다.
// context는 function이 될 수도 있다.

const startServer = async (typeDefs, resolvers) => {
	const apollo = new ApolloServer({
		resolvers,
		typeDefs,
		// context가 token을 받는게 아니라 utils의 user를 받게 설정해준다.
		context: async ({ req }) => {
			return {
				loggedInUser: await getUser(req.headers.token),
				protectedResolver,
			};
		},
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apollo.start();
	const app = express();
	app.use(looger("tiny"));
	app.use("/static", express.static("uploads"));
	app.use(cors());
	app.use(graphqlUploadExpress());
	apollo.applyMiddleware({ app });
	await new Promise((func) => app.listen({ port: PORT }, func));
	console.log(
		`🚀ApolloServer is running on http://localhost:${PORT}${apollo.graphqlPath}`
	);
};

startServer(typeDefs, resolvers);
