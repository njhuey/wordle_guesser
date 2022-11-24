import React from "react";
import { Flex, Text, HStack, VStack } from "@chakra-ui/react";

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
  const word = [];
  for (let i = 0; i < 5; i++) {
    if (props.word[i] == props.target.toLowerCase()[i]) {
      word.push(
        <GenerateLetter letter={props.word[i]} color="#538d4e" key={i} />
      );
    } else if (props.target.toLowerCase().includes(props.word[i])) {
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
