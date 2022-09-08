import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import exampleHouse from "../assets/house.jpeg";
import { trpc } from "../utils/trpc";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import github from "../assets/github.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Images, Property } from "@prisma/client";
import { getRandomPropertyId } from "../utils/getRandomProperty";

// import { trpc } from "../utils/trpc";

// type Card = {
//   name: string;
//   description: string;
// };

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session }: any = useSession();

  const [priceToggle, setPriceToggle] = useState(false);

  const [image, setImage] = useState(0);

  const [menuToggle, setMenuToggle] = useState(false);

  const [propertyNum] = useState(getRandomPropertyId());

  const {
    data: propertyData,
    isLoading: propertyLoading,
    isError: propertyError,
  } = trpc.useQuery(["example.getRandomProperty", { id: propertyNum }], {
    refetchOnWindowFocus: false,
  });
  const {
    data: imageData,
    isLoading: imageLoading,
    isError: imageError,
  } = trpc.useQuery(["example.getRandomPropertyImages", { id: propertyNum }], {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setImage(0);
  }, []);

  if (imageError || propertyError) {
    return <div>Something unexpected happened :/</div>;
  }

  const handleNextImage = async () => {
    if (imageData) {
      if (image >= imageData.length - 1) {
        return setImage(0);
      }
      setImage(image + 1);
    }
  };
  const handlePrevImage = async () => {
    if (imageData) {
      if (image <= 0) {
        return setImage(imageData.length - 1);
      }
      setImage(image - 1);
    }
  };

  const menuOpen = () => {
    setMenuToggle(!menuToggle);
    console.log("menu toggled");
  };

  return (
    <>
      <Head>
        <title>Estate Guesser</title>
        <meta name="description" content="Guess the house price to win!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex md:justify-between justify-center flex-row-reverse items-center h-screen w-screen font-mono bg-[#202020] text-white p-12 relative text-center overflow-hidden ">
        {!menuToggle ? (
          <div className="bg-black opacity-60 h-[100vh] -m-12  md:flex justify-between p-2 items-center flex-col rounded-lg w-[4%] hover:opacity-80 transition-all hidden">
            <MenuIcon
              className="w-6 lg:w-8  mt-6 hover:opacity-100 cursor-pointer hover:text-red-400"
              onClick={() => menuOpen()}
            />

            {session ? (
              <div>
                <LogoutIcon
                  className="w-6 lg:w-8 hover:text-red-400 text-white"
                  onClick={() => signOut()}
                />
                <br />
                <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
              </div>
            ) : (
              <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
            )}
          </div>
        ) : (
          <>
            <div className="bg-black opacity-60 h-[100vh] -m-12  md:flex flex-row-reverse p-2 items-center rounded-lg w-[14%] hover:opacity-80 transition-all hidden z-10">
              <div className="flex flex-col justify-between h-screen items-center p-2">
                <XIcon
                  className="w-6 lg:w-8  mt-6 hover:opacity-100 cursor-pointer hover:text-red-400"
                  onClick={() => menuOpen()}
                />

                <CogIcon className="w-6 lg:w-8 hover:animate-spin hover:text-red-400 transition-all mb-6" />
              </div>
              <div className="h-[91vh] bg-red-400 w-1 rounded-full" />
              <div className="flex justify-center items-start pt-24 w-[100%] h-full">
                {!session ? (
                  <button
                    onClick={() => signIn()}
                    className="hover:text-red-400 hover:scale-105 transition-all"
                  >
                    Sign In
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => signOut()}
                      className="hover:text-red-400 hover:scale-105 transition-all"
                    >
                      Sign Out!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col w-screen items-center">
          <div>
            <h1 className="text-4xl font-bold text-center">Estate Guesser</h1>
            {!session ? (
              <p className="opacity-50 text-center">Login to save progress!</p>
            ) : (
              <p className="opacity-50 text-center">{session.user.name}</p>
            )}
          </div>

          <div className="flex justify-center items-center my-12">
            <ChevronLeftIcon
              onClick={() => handlePrevImage()}
              className="h-16 w-16 hover:scale-110 hover:text-red-400 cursor-pointer transition-all pr-2 hover:-translate-x-1"
            />
            <div className="">
              {imageLoading && propertyLoading ? (
                <div className="">
                  <Image
                    src={exampleHouse}
                    alt="House"
                    width={900}
                    height={508}
                    className="rounded-md shadow-lg"
                  />
                </div>
              ) : imageData && propertyData ? (
                <div className="text-white text-2xl">
                  {propertyData.map((property: Property) => (
                    <div key={property.id} className="pb-4">
                      {property.address}
                    </div>
                  ))}
                  <Image
                    src={imageData[image]?.imageURL || exampleHouse}
                    alt="House"
                    width={900}
                    height={508}
                    className="rounded-md "
                  />
                  <p className="pt-2">
                    {image + 1}/{imageData.length}
                  </p>
                </div>
              ) : (
                <div>Something went wrong...</div>
              )}
            </div>
            <ChevronRightIcon
              onClick={() => handleNextImage()}
              className="h-16 w-16 hover:scale-110 hover:text-red-400 cursor-pointer transition-all pl-2 hover:translate-x-1 z-0"
            />
          </div>
          <div className="flex flex-col">
            <input
              type=""
              placeholder="Guess Price!"
              className="w-[40vh] items-center text-center h-8 rounded-xl outline-none text-white bg-[black] shadow-xl "
            />
            {priceToggle && propertyData ? (
              <h1>{propertyData[0]?.price}</h1>
            ) : (
              <button onClick={() => setPriceToggle(!priceToggle)}>
                Show Price
              </button>
            )}
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
