import { createRouter } from "./context";
import { z } from "zod";
import { getRandomPropertyId } from "../../utils/getRandomProperty";

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
      const randomIndex: any = input.id;
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
      const randomIndex: any = input.id;
      return ctx.prisma.images.findMany({
        where: {
          propertyID: randomIndex,
        },
      });
    },
  });
