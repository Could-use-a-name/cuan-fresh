import { GraphQLClient } from 'graphql';

const endpoint = Deno.env.get("GRAPHCMS_ENDPOINT");
const env = Deno.env.get("ENV");
const token = env === "PROD" ? Deno.env.get("GRAPHCMS_PROD_TOKEN") : Deno.env.get("GRAPHCMS_DEV_TOKEN");

export const graphcms = new GraphQLClient(endpoint, { headers: { authorization: `Bearer ${token}`}});