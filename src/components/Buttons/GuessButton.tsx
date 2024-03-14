interface GuessButtonProps {
    value: string;
    onChange: (newValue: string) => void
    onSubmit: () => void;
}

export default function GuessButton({ value, onChange, onSubmit }: GuessButtonProps) {
    const handleChange = (e: any) => {
        // Get the new value from the input element
        let newValue = e.target.value;

        // Check if Enter key was pressed (key code 13)

        // Remove any non-digit characters (except periods and hyphens if you want to allow decimal numbers)
        newValue = newValue.replace(/[^0-9.-]/g, "");

        // If there's more than one period, remove all but the first one (to allow decimal numbers)
        newValue = newValue.replace(/(\..*)\./g, "$1");

        // Add commas every three digits
        newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Update the state with the new value
        onChange(newValue);

        // Check if Enter key was pressed (key code 13)
        if (e.keyCode === 13) {
            // Execute something when Enter key is pressed
            // For example, you can submit a form, trigger an action, or perform any other desired task.
            // Here, I'm just logging a message as an example.
            // open();
            onSubmit()
        }
    };
    return (
        <div className="border-0 border-black w-full h-full flex flex-col justify-center items-center">
            <p className="font-bold text-xl text-start text-green-400">
                Guess House Price:
            </p>
            <div className="w-64 h-10 border-0 border-black rounded-md">
                <input
                    onKeyDown={(e) => handleChange(e)}
                    maxLength={12}
                    value={"$" + value}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="text-white w-full h-full bg-[#343434] p-4 italic outline-none rounded-md text-center"
                />
            </div>
        </div>

    )
}

