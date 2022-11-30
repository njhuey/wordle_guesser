import React from "react";
import { Flex, Text, HStack, VStack, Textarea } from "@chakra-ui/react";

export function GenerateWordle(props: any) {
  //creates the wordle board
  const wordleBoard = [];
  for (let i = 0; i < 6; i++) {
    if (i < props.words.length) {
      wordleBoard.push(
        <GenerateWord word={props.words[i]} target={props.target} />
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
      <Flex w="60px" h="60px" bg={props.color} justify="center" align="center">
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
