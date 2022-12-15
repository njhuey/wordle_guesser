import { useState } from "react";
import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  VStack,
  Spacer,
  Divider,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";
import { CustomWordle } from "../src/customWordle";
import { ColorCycleWordle } from "../src/cycleWords";

export default function Home() {
  return (
    <Flex w="100%" minH="100vh" bg="#121213" flexDir="column">
      <VStack w="100vw" h="100%">
        <Heading size="2xl" color="white" margin={4}>
          WordleBot
        </Heading>
        <Divider />
        <Tabs
          color="white"
          variant="solid-rounded"
          colorScheme="grey"
          pt={4}
          align="center"
          w="80%"
        >
          <TabList mb="20px">
            <Tab w="3xs">Daily Wordle</Tab>
            <Tab w="3xs">Custom Wordle</Tab>
            <Tab w="3xs">Info</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <ColorCycleWordle />
              </Center>
            </TabPanel>
            <TabPanel>
              <CustomWordle />
            </TabPanel>
            <TabPanel>
              <Box h={12}>
                <Text fontSize="2xl" as="b" mt="lg">
                  General Info
                </Text>
              </Box>
              <Text maxW="4xl">
                WordleBot uses positional frequency to evaluate the best guess
                for the game Wordle. The process starts with first determining
                the positional letter frequency for all possible words. Then, it
                picks the word with the highest combined value for the
                positional frequency value for each letter. Lastly, the script
                removes words that are no longer possible based on the color
                coded response returned by wordle.
              </Text>
              <Box h={8} />
              <Text>Success Rate: 89%</Text>
              <Text>Average Number of Guesses: 4.3</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Spacer />
      <Text color="white" alignSelf="center" pb={6}>
        Nathan Huey &#169; 2022-2022 &#160; &#160;
      </Text>
    </Flex>
  );
}
