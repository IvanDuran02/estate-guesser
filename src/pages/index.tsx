import type { NextPage } from "next";
import Head from "next/head";
import NextImage from "next/image";
import exampleHouse from "../assets/house.jpeg";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getRandomPropertyId } from "../utils/getRandomProperty";
import { queryProperty, queryPropertyImages } from "../utils/queries";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session }: any = useSession();

  // shows price of the house on toggle
  const [priceToggle, setPriceToggle] = useState(false);

  // switches between images for the house
  const [image, setImage] = useState(0);

  // opens and closes the side hamburger menu
  const [menuToggle, setMenuToggle] = useState(false);

  // gets a random property id from the database
  const [propertyNum] = useState(getRandomPropertyId());

  const [propertyData, setPropertyData] = useState<
    (
      | {
          address: string;
          id: number;
          link: string;
          price: string;
          zpid: string;
        }
      | undefined
    )[]
  >([]);
  const [imageData, setImageData] = useState<
    ({ id: number; imageURL: string; propertyID: number } | undefined)[]
  >([]);

  const handleNextImage = async () => {
    if (imageData) {
      if (image >= imageData?.length - 1) {
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

  useEffect(() => {
    setImage(0);
    setPropertyData(queryProperty(propertyNum));
    setImageData(queryPropertyImages(propertyNum));
  }, [propertyNum]);

  useEffect(() => {
    if (imageData) {
      imageData.forEach((picture) => {
        console.log(picture?.imageURL);
        const imgElement: any = new window.Image(); // Use 'window.Image' to explicitly refer to the browser's Image constructor
        imgElement.src = picture?.imageURL;
      });
    }
  }, [imageData]);

  if (!propertyData && !imageData) {
    return <div>Loading...</div>;
  }

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
              {/* {imageLoading && propertyLoading ? (
                <div className="">
                  <Image
                    src={exampleHouse}
                    alt="House"
                    width={900}
                    height={508}
                    className="rounded-md shadow-lg"
                  />
                </div>
              ) : imageData && propertyData ? ( */}
              <div className="text-white text-2xl">
                <div key={propertyData[0]?.address} className="pb-4">
                  {propertyData[0]?.address}
                </div>

                <img
                  src={imageData[image]?.imageURL || exampleHouse}
                  alt="House"
                  width={900}
                  height={508}
                  className="rounded-md  md:w-[900px] object-contain md:object-cover h-[508px]"
                />
                <p className="pt-2">
                  {image + 1}/{imageData.length}
                </p>
              </div>
              {/* ) : (
                <div>Something went wrong...</div>
              )} */}
            </div>
            <ChevronRightIcon
              onClick={() => handleNextImage()}
              className="h-16 w-16 hover:scale-110 hover:text-red-400 cursor-pointer transition-all pl-2 hover:translate-x-1 z-0"
            />
          </div>
          <div className="flex flex-col -mt-5 mb-5">
            {/* <input
              type=""
              placeholder="Guess Price!"
              className="w-[40vh] items-center text-center h-8 rounded-xl outline-none text-white bg-[black] shadow-xl "
            /> */}
            {priceToggle && propertyData ? (
              <h1
                className="text-xl text-red-400 cursor-pointer hover:scale-110"
                onClick={() => setPriceToggle(!priceToggle)}
              >
                {propertyData[0]?.price}
              </h1>
            ) : (
              <button
                className="w-36 text-white h-10 rounded-xl outline-none shadow-xl border border-white hover:scale-110 hover:bg-white hover:text-black hover:border-black transition-all"
                onClick={() => setPriceToggle(!priceToggle)}
              >
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
