import passport from "@fastify/passport";
import { FastifyInstance, RouteOptions } from "fastify";
import { stdReply } from "../../../lib/std-reply";

export default async function routes(
  fastify: FastifyInstance,
  options: RouteOptions
) {
  fastify.post(
    "/",
    {
      preHandler: passport.authenticate("local"),
    },
    async (request, reply) => {
      // TODO: properly type this
      const user = request.user;

      if (!user) {
        throw new Error(); // Something went wrong...
      }

      stdReply(reply, {
        clientMessage: `Successfully logged in as ${user.id}`,
      });
    }
  );
}
