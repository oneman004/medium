// import { PrismaClient } from "@prisma/client/edge"
// import { withAccelerate } from "@prisma/extension-accelerate"
// import { Hono } from "hono"
// import { sign } from "hono/jwt"


// export const userRouter = new Hono<{
//     Bindings: {
//       DATABASE_URL : string,
//       JWT_SECRET : string
//     }
//   }>()

// userRouter.post("/signup", async (context) => {

//     const prisma = new PrismaClient({
//       datasourceUrl: context.env.DATABASE_URL,
//   }).$extends(withAccelerate())
  
//     const data = await context.req.json();
//     const user = await prisma.user.create({
//       data: {
//         email: data.email,
//         password: data.password,
//       }
//     })
    
//     const token = await sign({ id: user.id },context.env.JWT_SECRET)
    
//     console.log(token);
  
//     return context.json({token});
//   })
  
  
  
  
// userRouter.post("/signin", async (context) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: context.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//     const body = await context.req.json();
//     const user = await prisma.user.findUnique({
//       where: {
//         email: body.email,
//         password: body.password
//       }
//     });
  
//     if(!user) {
//       context.status(403);
//       return context.json({
//         msg: "user does not exist"
//       })
//     }
  
//     const token = await sign({id: user.id}, context.env.JWT_SECRET);
//     return context.json({msg: "successfully signed in" ,
//       jwt: token})
    
//   })


import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signupInput } from '@abhi__win__2104/medium-common';


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (context) => {
  const data = await context.req.json();
  const {success } = signupInput.safeParse(data);
  if(!success){
    context.json(411);
    context.json({
      msg: "invalid inputs"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: context.env.DATABASE_URL,
  }).$extends(withAccelerate());

  

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
      name: data.name
    }
  });

  if (!context.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = await sign({ id: user.id }, context.env.JWT_SECRET);

  console.log(token);

  return context.json({ token });
});

userRouter.post('/signin', async (context) => {
  const prisma = new PrismaClient({
    datasourceUrl: context.env.DATABASE_URL,
  }).$extends(withAccelerate());
 
  const body = await context.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    context.status(403);
    return context.json({
      msg: 'User does not exist'
    });
  }

  if (!context.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = await sign({ id: user.id }, context.env.JWT_SECRET);

  return context.json({ token });
});


