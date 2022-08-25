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
    async resolve({ ctx }) {
      return await ctx.prisma.property
        .findMany({
          where: {
            id: getRandomPropertyId(),
          },
        })
        .then((property) => {
          return ctx.prisma.images.findMany({
            where: {
              propertyID: property[0]?.id,
            },
          });
        });
    },
  });
