import ReactFCCtest from "react-fcctest";
import { useEffect, useState } from "react";
import "./styles.css";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "*" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." }
];

const operators = ["AC", "+", "-", "*", "/", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

export default function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("0");
  const [calculatorData, setCalculatorData] = useState("");

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    const handleSubmit = () => {
      const total = eval(calculatorData);
      setInput(`${total}`);
      setOutput(`${total}`);
      setCalculatorData(`${total}`);
    };

    const dotOperator = () => {
      const lastChar = calculatorData.charAt(calculatorData.length - 1);
      if (!calculatorData.length) {
        setInput("0.");
        setCalculatorData("0.");
      } else {
        if (operators.includes(lastChar)) {
          setInput("0.");
          setCalculatorData(`${calculatorData} 0.`);
        } else {
          setInput(
            lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
          );
          setCalculatorData(
            lastChar === "." || input.includes(".")
              ? `${calculatorData}`
              : `${calculatorData}.`
          );
        }
      }
    };

    const handleOperator = (value) => {
      /*if (calculatorData.length) {
        setInput(`${value}`);

        const secondLastChar = calculatorData.charAt(calculatorData - 2);
        const secondLastCharIsOperator = operators.includes(secondLastChar);

        const lastChar = calculatorData.charAt(calculatorData - 1);
        const lastCharIsOperator = operators.includes(lastChar);

        if (
          (lastCharIsOperator && value !== "-") ||
          (secondLastCharIsOperator && lastCharIsOperator)
        ) {
          if (secondLastCharIsOperator) {
            const updatedValue = `${calculatorData.substring(
              0,
              calculatorData.length - 2
            )}${value}`;
            setCalculatorData(updatedValue);
          } else {
            setCalculatorData(
              `${calculatorData.substring(
                0,
                calculatorData.length - 1
              )}${value}`
            );
          }
        } else {
          setCalculatorData(`${calculatorData}${value}`);
        }
      }*/
      if (calculatorData.length) {
        setInput(`${value}`);
        const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

        const beforeLastChatIsOperator = operators.includes(beforeLastChat);

        const lastChat = calculatorData.charAt(calculatorData.length - 1);

        const lastChatIsOperator = operators.includes(lastChat);

        if (
          (lastChatIsOperator && value !== "-") ||
          (beforeLastChatIsOperator && lastChatIsOperator)
        ) {
          if (beforeLastChatIsOperator) {
            const updatedValue = `${calculatorData.substring(
              0,
              calculatorData.length - 2
            )}${value}`;
            setCalculatorData(updatedValue);
          } else {
            setCalculatorData(
              `${calculatorData.substring(
                0,
                calculatorData.length - 1
              )}${value}`
            );
          }
        } else {
          setCalculatorData(`${calculatorData}${value}`);
        }
      }
    };

    const handleNumber = (value) => {
      if (!calculatorData.length) {
        setInput(`${value}`);
        setCalculatorData(`${value}`);
      } else {
        if (value === 0 && (calculatorData === "0" || input === "0")) {
          setCalculatorData(`${calculatorData}`);
        } else {
          const lastChar = calculatorData.charAt(calculatorData.length - 1);
          const isLastCharOperator = operators.includes(lastChar);

          setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
          setCalculatorData(`${calculatorData}${value}`);
        }
      }
    };

    const handleClear = () => {
      setCalculatorData("");
      setOutput("");
      setInput("0");
    };

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case ".":
        dotOperator();
        break;
      case number:
        handleNumber(value);
        break;
      case operator:
        handleOperator(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <>
      <ReactFCCtest />
      <div className="container">
        <div className="calculator">
          <Display input={input} output={output} />
          <Keyboard handleInput={handleInput} />
        </div>
      </div>
    </>
  );
}
