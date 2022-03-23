// grphaql-tools 버전 업데이트로
// 1. @graphql-tools/schema, @graphql-tools/load-files, @graphql-tools/merge를 각각 다운받아서 사용
// 2. graphql-tools 버전 다운그레이드해서 사용

import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

// 모든 폴더 내의 모든 typeDefs와 queires, mutations를 모아준다.
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
