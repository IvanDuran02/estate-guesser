import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import exampleHouse from "../assets/house.jpeg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import github from "../assets/github.png";
import Link from "next/link";
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

      <main className="flex flex-col items-center h-screen w-screen font-mono bg-[#202020] text-white p-12 justify-between relative text-center">
        <div>
          <div className="flex justify-between items-center w-auto">
            <div className="w-8 h-8 opacity-50 hover:opacity-100 cursor-pointer absolute top-14 left-96">
              <Link
                href="https://github.com/IvanDuran02/estate-guesser"
                target={"_blank"}
              >
                <Image src={github} alt="github" />
              </Link>
            </div>

            <h1 className="text-4xl text-center">Estate Guesser</h1>

            <button
              onClick={() => signIn()}
              className="opacity-50 hover:opacity-100 hover:scale-105 transition-all absolute top-14 right-96"
            >
              Sign In
            </button>
          </div>
          <p className="opacity-60 text-center">
            Guess the house price to win!
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ChevronLeftIcon className="h-16 w-16 hover:scale-110 hover:text-red-400 cursor-pointer transition-all pr-2 hover:-translate-x-1" />
          <div>
            <Image
              src={exampleHouse}
              alt="House"
              width={900}
              height={508}
              className="rounded-md shadow-lg"
            />
          </div>
          <ChevronRightIcon className="h-16 w-16 hover:scale-110 hover:text-red-400 cursor-pointer transition-all pl-2 hover:translate-x-1" />
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
