import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import exampleHouse from "../assets/house.jpeg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import github from "../assets/github.png";
import Link from "next/link";
import { useState } from "react";
// import { trpc } from "../utils/trpc";

// type Card = {
//   name: string;
//   description: string;
// };

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { session }: any = useSession();

  const [menuToggle, setMenuToggle] = useState(false);

  const menuOpen = () => {
    setMenuToggle(!menuToggle);
  };

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

      <main className="flex md:justify-between justify-center flex-row-reverse items-center h-screen w-screen font-mono bg-[#202020] text-white p-12 relative text-center overflow-hidden">
        <div className="bg-black opacity-60 h-[100vh] -m-12  md:flex justify-between p-2 items-center flex-col rounded-lg w-[4%] hover:opacity-80 transition-all hidden">
          <MenuIcon
            className="w-6 lg:w-8  mt-4 hover:opacity-100 cursor-pointer hover:text-red-400"
            onClick={() => menuOpen()}
          />

          <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-4" />
        </div>
        <div className="flex flex-col w-screen items-center">
          <div>
            <h1 className="text-4xl font-bold text-center">Estate Guesser</h1>
            <p className="opacity-50 text-center">
              Guess the house price to win!
            </p>
          </div>

          <div className="flex justify-center items-center my-12">
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
        </div>
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
