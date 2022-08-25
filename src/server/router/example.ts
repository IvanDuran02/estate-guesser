import { createRouter } from "./context";
import { z } from "zod";
import { getRandomPropertyId } from "../../utils/getRandomProperty";

const randomIndex = getRandomPropertyId();

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
    async resolve({ ctx }) {
      return await ctx.prisma.property.findMany({
        where: {
          id: randomIndex,
        },
      });
    },
  })
  .query("getRandomPropertyImages", {
    async resolve({ ctx }) {
      return ctx.prisma.images.findMany({
        where: {
          propertyID: randomIndex,
        },
      });
    },
  });
