import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
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
