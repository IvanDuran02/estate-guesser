import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import exampleHouse from "../assets/house.jpeg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
// import { trpc } from "../utils/trpc";

// type Card = {
//   name: string;
//   description: string;
// };

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session }: any = useSession();

  if (session) {
    return (
      <div className="text-white">
        <div>You are logged in</div>
        <button onClick={() => signOut()}>Sign Out!</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Estate Guesser</title>
        <meta name="description" content="Guess the house price to win!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-screen w-screen font-mono bg-[#202020] text-white p-12 justify-between relative">
        <div>
          <h1 className="text-4xl">Estate Guesser</h1>
          <p className="opacity-60">Guess the house price to win!</p>
          <button
            onClick={() => signIn()}
            className="absolute top-16 right-40 opacity-50 hover:opacity-100 hover:scale-105 transition-all"
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <ChevronLeftIcon className="h-12 w-12 hover:scale-105 hover:text-red-400 cursor-pointer transition-all " />
          <Image
            src={exampleHouse}
            alt="House"
            height={720}
            width={1280}
            className="rounded-md shadow-lg"
          />
          <ChevronRightIcon className="h-12 w-12 hover:scale-105 hover:text-red-400 cursor-pointer transition-all" />
        </div>
        <div>
          <input
            type=""
            placeholder="Guess Price!"
            className="w-[40vh] items-center text-center h-8 rounded-xl outline-none text-white bg-[black] shadow-xl "
          />
        </div>
        <p className="opacity-60">Note: App still in production!</p>
      </main>
    </>
  );
};

// const Card = ({ name, description }: Card) => {
//   return (
//     <div>
//       <h2 className="text-red-400">{name}</h2>
//       <p className="text-blue-500">{description}</p>
//     </div>
//   );
// };

export default Home;
