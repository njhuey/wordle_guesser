import { useState } from "react";
import { Flex, Text, HStack, VStack, Button } from "@chakra-ui/react";
const axios = require("axios");

export function GenerateWordle(props: any) {
  //creates the wordle board
  const wordleBoard = [];
  for (let i = 0; i < 6; i++) {
    if (i < props.words.length) {
      wordleBoard.push(
        <GenerateWord word={props.words[i]} target={props.target} key={i} />
      );
    } else {
      wordleBoard.push(<GenerateWord word={"     "} target={props.target} />);
    }
  }
  return <VStack>{wordleBoard}</VStack>;
}

export function GenerateWord(props: any) {
  //creates individual words in the board
  const colors = ["grey", "grey", "grey", "grey", "grey"];
  let target_word: string = props.target.toLowerCase();
  const guess = props.word;

  for (let i = 0; i < 5; i++) {
    if (guess[i] == target_word[i]) {
      colors[i] = "green";
      let temp = target_word.slice(0, i);
      temp += " ";
      temp += target_word.slice(i + 1, target_word.length);
      target_word = temp;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (target_word.indexOf(guess[i]) != -1 && colors[i] != "green") {
      colors[i] = "yellow";
      target_word = target_word.replace(guess[i], " ");
    }
  }

  let word = [];
  for (let i = 0; i < 5; i++) {
    if (colors[i] == "green") {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#538d4e" key={i} />
      );
    } else if (colors[i] == "yellow") {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#b59f3b" key={i} />
      );
    } else {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#3a3a3d" key={i} />
      );
    }
  }

  return <HStack>{word}</HStack>;
}

export function GenerateLetter(props: any) {
  //creates letters
  if (props.letter != " ") {
    return (
      <Flex
        w="60px"
        h="60px"
        bg={props.color}
        justify="center"
        align="center"
        userSelect="none"
      >
        <Text textTransform="uppercase" fontSize="4xl" as="b">
          {props.letter}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Flex
        w="60px"
        h="60px"
        bg="#121213"
        border="2px"
        borderColor="#3a3a3d"
        justify="center"
        align="center"
      />
    );
  }
}

export function ColorCycleWordle(props: any) {
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
      <HStack spacing="170" pt="10px">
        <Button colorScheme="blue" onClick={onSubmit}>
          Submit
        </Button>
        <Button colorScheme="blue" onClick={onReset}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}

export function Word(props: any) {
  let word = [];

  for (let i = 0; i < 5; i++) {
    if (props.colors[i] == 1) {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#538d4e" key={i} />
      );
    } else if (props.colors[i] == 2) {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#b59f3b" key={i} />
      );
    } else {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#3a3a3d" key={i} />
      );
    }
  }

  return <HStack>{word}</HStack>;
}

export function ColorCycleWord(props: any) {
  const lookup: { [key: number]: string } = {
    0: "#121213",
    1: "#538d4e",
    2: "#b59f3b",
    3: "#3a3a3d",
  };

  let word = [];
  for (let i = 0; i < 5; i++) {
    word.push(
      <ColorCycleLetter
        letter={props.word[i]}
        index={i}
        color={lookup[props.colors[i]]}
        onClick={(i: number) => props.onClick(i)}
      />
    );
  }

  return <HStack>{word}</HStack>;
}

function ColorCycleLetter(props: any) {
  return (
    <Flex
      w="60px"
      h="60px"
      bg={props.color}
      justify="center"
      align="center"
      border={props.color == "#121213" ? "2px" : "0px"}
      borderColor="#3a3a3d"
      key={0}
      userSelect="none"
      onClick={() => props.onClick(props.index)}
    >
      <Text textTransform="uppercase" fontSize="4xl" as="b">
        {props.letter}
      </Text>
    </Flex>
  );
}
