import { useState } from "react";
import { Text, HStack, VStack, Button } from "@chakra-ui/react";
import { GenerateWord, ColorCycleWord, Word } from "./words";
const axios = require("axios");

export function ColorCycleWordle() {
  const makeRequest = (temp_words: string[], temp_colors: number[][]) => {
    axios({
      method: "post",
      url: "http://localhost:8000/word/",
      data: {
        guesses: temp_words,
        colors: convertColors(temp_colors),
      },
    })
      .then(function (response: any) {
        // handle success
        console.log(response);
        setMessage("");
        setWords(temp_words);
        setColors(temp_colors);
        setCycleWord(response.data.guess);
        setCycleColors([0, 0, 0, 0, 0]);
        setIsError(0);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
        setMessage(
          "impossible wordle pattern, check discrepancies with wordle site"
        );
        setIsError(1);
      });
  };

  const convertColors = (colors: number[][]): string[][] => {
    const mapping: { [key: number]: string } = {
      1: "green",
      2: "yellow",
      3: "grey",
    };

    let newColors: string[][] = [];
    for (let i = 0; i < colors.length; i++) {
      let wordColor: string[] = [];
      for (let j = 0; j < colors[i].length; j++) {
        wordColor.push(mapping[colors[i][j]]);
      }
      newColors.push(wordColor);
    }
    return newColors;
  };

  const [words, setWords] = useState<string[]>([]);
  const [colors, setColors] = useState<number[][]>([]);
  const [cycleWord, setCycleWord] = useState<string>("cares");
  const [cycleColors, setCycleColors] = useState<number[]>([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [isError, setIsError] = useState<number>(0);

  const errorMapping: { [key: number]: string } = {
    0: "white",
    1: "red",
  };

  const changeColor = (i: number) => {
    let tempColors = cycleColors.slice();
    tempColors[i] = (tempColors[i] % 3) + 1;
    setCycleColors(tempColors);
  };

  const onSubmit = () => {
    if (cycleColors.every((val) => val == 1)) {
      if (!completed) {
        let temp_colors: number[][] = colors.slice();
        let temp_words: string[] = words.slice();
        temp_colors.push(cycleColors);
        temp_words.push(cycleWord);
        setWords(temp_words);
        setColors(temp_colors);
        setCompleted(true);
        setIsError(0);
        setMessage("Success!");
      }
    } else if (!cycleColors.includes(0)) {
      let temp_colors: number[][] = colors.slice();
      let temp_words: string[] = words.slice();
      temp_colors.push(cycleColors);
      temp_words.push(cycleWord);
      makeRequest(temp_words, temp_colors);
    } else {
      setMessage("each letter must have a specified color");
      setIsError(1);
    }
  };

  const onReset = () => {
    setWords([]);
    setColors([]);
    setCycleWord("cares");
    setCycleColors([0, 0, 0, 0, 0]);
    setMessage("");
    setCompleted(false);
    setIsError(0);
  };

  let coloredWords = [];
  for (let i = 0; i < colors.length; i++) {
    coloredWords.push(<Word word={words[i]} colors={colors[i]} />);
  }

  if (coloredWords.length < 6 && !completed) {
    coloredWords.push(
      <ColorCycleWord
        word={cycleWord}
        colors={cycleColors}
        onClick={(i: number) => changeColor(i)}
      />
    );
  }

  for (let i = coloredWords.length; i < 6; i++) {
    coloredWords.push(<GenerateWord word={"     "} target={"fffff"} />);
  }

  return (
    <VStack>
      <Text textColor={errorMapping[isError]}>{message}</Text>
      {coloredWords}
      <HStack pt="10px">
        <Button colorScheme="blue" w="162px" onClick={onSubmit}>
          Submit
        </Button>
        <Button colorScheme="blue" w="162px" onClick={onReset}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}
