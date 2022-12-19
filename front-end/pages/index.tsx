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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
              <Accordion>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="center">
                        <Text as="b">Daily Wordle</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    For the Daily Wordle section, WordleBot will give you a
                    prelimanary guess ("cares" is the first guess). Input this
                    guess into the offical wordle site. Report the color pattern
                    back to WordleBot by clicking the letters of the current
                    guess and then press submit. Then, WordleBot will give you
                    the next guess and you can continue the process until the
                    daily wordle is solved.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="center">
                        <Text as="b">Custom Wordle</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    For the Custom Wordle Section, input any valid 5 letter word
                    in the space provided then press enter. Then, WordleBot will
                    display the guesses needed to solve your custom wordle.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="center">
                        <Text as="b">General Info</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    WordleBot uses positional frequency to evaluate the best
                    guess for the game wordle. The process starts with first
                    determining the positional letter frequency for all possible
                    words. Then, it picks the word with the highest combined
                    value for the positional frequency value for each letter.
                    Lastly, the script removes words that are no longer possible
                    based on the color coded response returned by wordle.
                    <Box h={8} />
                    <Text>Success Rate: 89%</Text>
                    <Text>Average Number of Guesses: 4.3</Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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

// <Box h={12}>
//                 <Text fontSize="2xl" as="b" mt="lg">
//                   WordleBot Instructions
//                 </Text>
//               </Box>
//               <Text maxW="4xl">
// For the Daily Wordle section, WordleBot will give you a
// prelimanary guess ("cares" is the first guess). Input this guess
// into the offical wordle site. Report the color pattern back to
// WordleBot by clicking the letters of the current guess and then
// press submit. Then, WordleBot will give you the next guess and
// you can continue the process until the daily wordle is solved.
//               </Text>
//               <Text maxW="4xl">
// For the Custom Wordle Section, input any valid 5 letter word in
// the space provided then press enter. Then, WordleBot will
// display the guesses needed to solve your custom wordle.
//               </Text>
//               <Box h={12}>
//                 <Text fontSize="2xl" as="b" mt="lg">
//                   General Info
//                 </Text>
//               </Box>
//               <Text maxW="4xl">
// WordleBot uses positional frequency to evaluate the best guess
// for the game wordle. The process starts with first determining
// the positional letter frequency for all possible words. Then, it
// picks the word with the highest combined value for the
// positional frequency value for each letter. Lastly, the script
// removes words that are no longer possible based on the color
// coded response returned by wordle.
//               </Text>
//               <Box h={8} />
//               <Text>Success Rate: 89%</Text>
//               <Text>Average Number of Guesses: 4.3</Text>
