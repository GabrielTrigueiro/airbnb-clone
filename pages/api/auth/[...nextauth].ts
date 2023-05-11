
import prisma from "@/app/libs/prismaDb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials.password){
          throw new Error('Invalid credentials')
        }

        //prisma.user consegue acessar graças ao npx prisma db init
        //ele procura no db um user que possui o mesmo email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        //caso encontre não encontra um user ele não está cadastrado
        //caso não encontre a mesma senha a senha foi digitada errado
        if(!user || !user.hashedPassword){
          throw new Error('Invalid credentials')
        }

        //comparando a password recebida com a do db
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        
        //caso incorreta
        if(!isCorrectPassword){
          throw new Error('Invalid password')
        }

        return user;
      }
    })
  ],
  //caso ocorra algum erro redireciona para esta página
  //no caso, login
  pages:{
    signIn: '/'
  },
  //apenas possibilita debug se estiver em desenvolvimento
  debug: process.env.NODE_ENV == 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions);