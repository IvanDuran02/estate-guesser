import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("getRandomProperty", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const randomIndex = input.id;
      return await ctx.prisma.property.findMany({
        where: {
          id: randomIndex,
        },
      });
    },
  })
  .query("getRandomPropertyImages", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      const randomIndex = input.id;
      return ctx.prisma.images.findMany({
        where: {
          propertyID: randomIndex,
        },
      });
    },
  });
