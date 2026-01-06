import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { startOfDay, startOfMonth, startOfWeek } from "date-fns"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { parseColor } from "@/utils"
import { HTTPException } from "hono/http-exception"
import { FREE_QUOTA, PRO_QUOTA } from "@/config"

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const now = new Date()
    const firstDayOfMonth = startOfMonth(now)

    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const [lastPing, eventsCount] = await Promise.all([
          db.event.findFirst({
            where: {
              EventCategory: { id: category.id },
            },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
          db.event.count({
            where: {
              EventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
        ])

        return {
          id: category.id,
          name: category.name,
          emoji: category.emoji,
          color: category.color,
          updatedAt: category.updatedAt,
          createdAt: category.createdAt,
          uniqueFieldCount: 0, // Expensive operation disabled for performance
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    return c.superjson({ categories: categoriesWithCounts })
  }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, input, ctx }) => {
      const { name } = input

      await db.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      })

      return c.json({ success: true })
    }),

  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "Color is required")
          .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
        emoji: z.string().emoji("Invalid emoji").optional(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { color, name, emoji } = input

      // TODO: ADD PAID PLAN LOGIC - DONE
      const count = await db.eventCategory.count({
        where: { userId: user.id },
      })

      const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

      if (count >= limits.maxEventCategories) {
        throw new HTTPException(403, {
          message: `You have reached the limit of ${limits.maxEventCategories} categories for your plan. Please upgrade to PRO to create more categories.`,
        })
      }

      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      })

      return c.json({ eventCategory })
    }),

  insertQuickstartCategories: privateProcedure.mutation(async ({ ctx, c }) => {
    const categories = await db.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐛", color: 0xff6b6b },
        { name: "sale", emoji: "💰", color: 0xffeb3b },
        { name: "question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        userId: ctx.user.id,
      })),
    })

    return c.json({ success: true, count: categories.count })
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ c, ctx, input }) => {
      const { name } = input

      const category = await db.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      })

      if (!category) {
        throw new HTTPException(404, {
          message: `Category "${name}" not found`,
        })
      }

      const hasEvents = category._count.events > 0

      return c.json({ hasEvents })
    }),

  getEventsByCategoryName: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        page: z.number(),
        limit: z.number().max(50),
        timeRange: z.enum(["today", "week", "month"]),
      })
    )
    .query(async ({ c, ctx, input }) => {
      const { name, page, limit, timeRange } = input

      const now = new Date()
      let startDate: Date

      switch (timeRange) {
        case "today":
          startDate = startOfDay(now)
          break
        case "week":
          startDate = startOfWeek(now, { weekStartsOn: 0 })
          break
        case "month":
          startDate = startOfMonth(now)
          break
      }

      const [events, eventsCount, uniqueFieldCount] = await Promise.all([
        db.event.findMany({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        db.event.count({
          where: {
            EventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
        }),
        Promise.resolve(0), // Unique field count calculation disabled for performance
      ])

      return c.superjson({
        events,
        eventsCount,
        uniqueFieldCount,
      })
    }),
})
