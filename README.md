<div align="center">
    <a href="https://estate-guesser.vercel.app">
        <img src="https://res.cloudinary.com/venerable/image/upload/v1700591738/ba1gusjsjw3xypobykw0.png" width="64" height="64" alt="Estate Guesser Logo">
    </a>
    <h1>
        <a href="https://https://estate-guesser.vercel.app">
            Estate Guesser
        </a>
    </h1>
</div>

## Table of Contents

- [About me](#About-me)
- [Tech Stack](#Stack)
- [Steps to clone and run locally](#Steps-to-clone-and-run-locally)

---

## About me

Geoguesser like web app built for guessing housing prices in North America. Housing data is scraped of Zillow, around 2022. Link to that repository is here ([Zillow-Scraper](https://github.com/IvanDuran02/zillow-house-finder)). For ease of access, mostly to combat cold start and deactivactions, I coverted the housing data to JSON which can be found in the [assets folder](src/assets).

---

## Stack

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.io/) (PostgreSQL)

---

## Steps to Clone and Run Locally

#### 1. Clone the Repository

`git clone https://github.com/IvanDuran02/estate-guesser`

#### 2. Install Node Packages

##### Use a package manager like NPM, Yarn, or PNPM.

`npm install` or `yarn` or `pnpm install`

#### 3. Run Custom Dev Script

##### Execute the custom dev script from package.json located in the root path.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
