import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput } from "@aman004sharma/medium-common";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (context) => {
  const data = await context.req.json();
  const { success } = signupInput.safeParse(data);
  if (!success) {
    context.json(411);
    context.json({
      msg: "invalid inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: context.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  if (!context.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = await sign({ id: user.id }, context.env.JWT_SECRET);

  console.log(token);

  return context.json({ token });
});

userRouter.post("/signin", async (context) => {
  const prisma = new PrismaClient({
    datasourceUrl: context.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await context.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    context.status(403);
    return context.json({ msg: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    context.status(411);
    return context.json({ msg: "Password is invalid" });
  }

  if (!context.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = await sign({ id: user.id }, context.env.JWT_SECRET);

  return context.json({ token });
});
