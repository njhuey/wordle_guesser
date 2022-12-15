import { Flex, Text, HStack } from "@chakra-ui/react";
const axios = require("axios");

interface WordProps {
  word: string;
  colors: string[];
}

interface ColorCycleWordProps {
  word: string;
  colors: number[];
  onClick: (index: number) => void;
}

interface ColorCycleLetterProps {
  letter: string;
  color: string;
  index: number;
  onClick: (index: number) => void;
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

export function Word(props: WordProps) {
  //creates color coded word depending on props
  const mapping: { [key: string]: string } = {
    green: "#538d4e",
    yellow: "#b59f3b",
    grey: "#3a3a3d",
  };

  let word: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    word.push(
      <GenerateLetter
        letter={props.word[i]}
        color={mapping[props.colors[i]]}
        key={i}
      />
    );
  }

  return <HStack>{word}</HStack>;
}

export function ColorCycleWord(props: ColorCycleWordProps) {
  //creates word that cycles colors when clicked
  const lookup: { [key: number]: string } = {
    0: "#121213",
    1: "#538d4e",
    2: "#b59f3b",
    3: "#3a3a3d",
  };

  let word: JSX.Element[] = [];
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

export function BlankWord() {
  //creates blank word
  let word: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    word.push(<BlankLetter />);
  }

  return <HStack>{word}</HStack>;
}

function ColorCycleLetter(props: ColorCycleLetterProps) {
  //creates letter that cycles when clicked
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

function BlankLetter() {
  //creates blank letter
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
