/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type { NextPage } from "next";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { getRandomPropertyId } from "../utils/getRandomProperty";
import { queryProperty, queryPropertyImages } from "../utils/queries";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/Modal/Modal";
import useModal from "../hooks/useModal";
import GuessButton from "../components/Buttons/GuessButton";

const Home: NextPage = () => {
    // Modal state
    const { modalOpen, close, open } = useModal();

    // switches between images for the house
    const [image, setImage] = useState(0);

    // gets a random property id from the database
    const [propertyNum, setPropertyNum] = useState(getRandomPropertyId());

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

    const [width, setWidth] = useState<number | null>();
    const [value, setValue] = useState("");

    useEffect(() => {
        const hasWindow = typeof window !== "undefined";

        function getWindowDimensions() {
            const width = hasWindow ? window.innerWidth : null;
            const height = hasWindow ? window.innerHeight : null;

            return {
                width,
                height,
            };
        }

        setWidth(getWindowDimensions().width);
    }, [width]);

    useEffect(() => {
        setImage(0);
        setPropertyData(queryProperty(propertyNum));
        setImageData(queryPropertyImages(propertyNum));
    }, [propertyNum]);

    useEffect(() => {
        if (imageData) {
            imageData.forEach((picture) => {
                // console.log(picture?.imageURL);
                const imgElement = new window.Image(); // Use 'window.Image' to explicitly refer to the browser's Image constructor
                if (picture) {
                    imgElement.src = picture.imageURL;
                }
            });
        }
    }, [imageData]);

    if (!propertyData && !imageData) {
        return <div>Loading...</div>;
    }

    const HouseImages = () => {
        return (
            <div className="text-white text-2xl">
                <div key={propertyData[0]?.address} className="p-1 select-text">
                    {propertyData[0]?.address}
                </div>

                <img
                    src={imageData[image]?.imageURL}
                    alt="House"
                    width={900}
                    height={508}
                    className="rounded-md md:w-[900px] object-contain md:object-cover md:h-[508px]"
                />
            </div>
        );
    };

    const ImageComponent = () => {
        return (
            <div className="flex flex-col justify-evenly items-center my-12 border-0 border-blue-400">
                <HouseImages />
                <div className="flex justify-center items-center border-0 border-green-400 w-full py-2">
                    <div
                        className="flex-1 h-12 border-2 border-red-400 flex justify-center items-center border-opacity-50 rounded-md  hover:text-red-400 cursor-pointer transition-all hover:-translate-x-1 select-none"
                        onClick={() => handlePrevImage()}
                    >
                        <ChevronLeftIcon className="h-12 w-12" />
                    </div>

                    <p className="text-3xl px-8">
                        {image + 1}/{imageData.length}
                    </p>

                    <div
                        className="h-12 border-2 border-red-400 border-opacity-50 rounded-md flex flex-1 justify-center items-center hover:text-red-400 cursor-pointer transition-all hover:translate-x-1 select-none"
                        onClick={() => handleNextImage()}
                    >
                        <ChevronRightIcon className="h-12 w-12" />
                    </div>
                </div>
            </div>
        );
    };

    const ModalContainer = ({ children, label }: any) => (
        // Enables the animation of components that have been removed from the tree
        <AnimatePresence
            // Disable any initial animations on children that
            // are present when the component is first rendered
            initial={false}
            // Only render one component at a time.
            // The exiting component will finish its exit
            // animation before entering component is rendered
            mode="wait"
        // Fires when all exiting nodes have completed animating out
        >
            {children}
        </AnimatePresence>
    );

    const ModalComponent = ({ text }: { text: string }) => {
        return (
            <div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="save-button"
                    onClick={open}
                />

                <ModalContainer>
                    {modalOpen && propertyData[0] && (
                        <Modal
                            modalOpen={modalOpen}
                            text={text}
                            handleClose={() => {
                                close();
                                setPropertyNum(getRandomPropertyId);
                                setValue("");
                            }}
                            guessPrice={"$" + value}
                            housePrice={propertyData[0].price}
                        />
                    )}
                </ModalContainer>
            </div>
        );
    };

    return (
        <>
            <main className="flex md:justify-between justify-center flex-row-reverse items-center max-w-screen font-mono bg-[#202020] text-white p-12 relative text-center overflow-hidden ">
                {/* <MenuComponent /> */}
                <div className="flex flex-col w-screen items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-center">Estate Guesser</h1>
                        {/* {!session ? (
              <p className="opacity-50 text-center">Login to save progress!</p>
            ) : (
              <p className="opacity-50 text-center">{session.user.name}</p>
            )} */}
                    </div>

                    <ImageComponent />
                    <GuessButton value={value} onChange={(newValue: string) => setValue(newValue)} onSubmit={open} />

                    <ModalComponent text={"Guess the house price!"} />
                </div>
            </main>
        </>
    );
};

export default Home;
