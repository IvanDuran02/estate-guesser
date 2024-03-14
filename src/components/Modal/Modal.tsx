import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Backdrop from "./Backdrop";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = ({
    modalOpen,
    handleClose,
    text,
    housePrice,
    guessPrice,
}: {
    modalOpen: true;
    handleClose: () => void;
    text: string;
    housePrice: string | number;
    guessPrice: string | number;
}) => {
    const [currency, setCurrency] = useState("");
    const [win, isWinner] = useState(false);
    const [difference, setDifference] = useState("");

    function convertToInteger(str: string | number | null) {
        // Check if str is a string
        if (typeof str !== "string") {
            return null; // or throw an error or handle it accordingly
        }

        if (str.match(/\C\$/)) {
            setCurrency("C$");
        } else {
            setCurrency("$");
        }
        // Remove dollar signs and commas from the string
        const numericStr = str.replace(/[$,C]/g, "");

        // Parse the numeric string as an integer
        const intValue = parseInt(numericStr, 10);

        return intValue;
    }

    function calculateStats(
        guess: string | number | null,
        price: string | number | null
    ) {
        guess = convertToInteger(guessPrice);
        price = convertToInteger(price);
        // Calculate the absolute difference between actual and guess
        if (price && guess) {
            const difference = Math.abs(price - guess);

            // Calculate the percentage difference
            const percentageDifference = (difference / Math.abs(price)) * 100;

            return {
                percentageDifference: percentageDifference,
                difference: difference,
            };
        }
    }

    const ShakeVariant = ({
        hidden: {},
        visible: {
            [win ? "y" : "x"]: win ? [10, -10, 10, -10] : [-10, 10, -10, 10],
            transition: { duration: 0.3, repeat: 2 }, // Adjust duration and repeat count as needed
        },
    });

    const modalControls = useAnimation();
    useEffect(() => {


        function formatPrice() {
            let diff: string | number =
                calculateStats(guessPrice, housePrice)?.difference || 0; // undefined when correct guess...
            let percDiff: any = calculateStats(
                guessPrice,
                housePrice
            )?.percentageDifference;

            // If the difference is within the specified percentage
            if (percDiff <= 10) {
                console.log("Winner is true")
                isWinner(true);
                modalControls.start("visible");
            } else {
                isWinner(false);
                modalControls.start("visible");
            }

            // Round the percentageDifference to two decimal places
            percDiff = percDiff.toFixed(2);

            diff = currency + diff.toLocaleString();
            percDiff = percDiff?.toString() + "%";

            setDifference(diff);

            return {
                diff: diff,
                percDiff: percDiff,
            };
        }
        console.log(formatPrice().diff, formatPrice().percDiff, win);
    }, [win]);

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                className="modal bg-white text-black flex flex-col justify-center items-center"
                variants={ShakeVariant}
                initial="hidden"
                animate={modalControls}
                exit="exit"
            >
                <h1 className="text-2xl font-bold">
                    {win ? "You Won!" : `You lost, off by ${difference}`}
                </h1>

                <h2 className="text-2xl font-bold">Original price was {housePrice}</h2>
                <h2 className="text-2xl font-bold">You guessed {guessPrice}</h2>
                <ModalButton onClick={handleClose} label="Close" />
            </motion.div>
        </Backdrop>
    );
};

const ModalButton = ({ onClick, label }: any) => (
    <motion.button
        className="modal-button"
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
    >
        {label}
    </motion.button>
);

export default Modal;
