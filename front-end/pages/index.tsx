import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Heading,
  Flex,
  VStack,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Divider,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Center,
  Text,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { GenerateWordle } from "../src/components/words";
import { makeRequest } from "../src/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [validWord, setValidWord] = useState("");
  const [customWords, setCustomWords] = useState([]);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: any) => {
    console.log(e);
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
    //calls request function then interprets response
    makeRequest("http://localhost:8000/guess/?word=" + word.toLowerCase())
      .then(function (response: any) {
        setCustomWords(response.data.guesses);
        setValidWord(word);
        setIsError(false);
        console.log(customWords);
      })
      .catch(function (error: any) {
        setIsError(true);
      });
  };

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
          <TabList>
            <Tab w="3xs">Daily Wordle</Tab>
            <Tab w="3xs">Custom Wordle</Tab>
            <Tab w="3xs">Info</Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>
              <FormControl
                isInvalid={isError}
                onSubmit={(e) => {
                  e.preventDefault();
                  makeCustomRequest(input);
                }}
                pb={4}
              >
                <form>
                  <Input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    w="100%"
                    maxW="sm"
                    placeholder="Input 5 Letter Word"
                    textTransform="lowercase"
                  />
                </form>
                <Box w="100%" maxW="sm">
                  <FormErrorMessage>invalid input</FormErrorMessage>
                </Box>
              </FormControl>
              <Center>
                <GenerateWordle words={customWords} target={validWord} />
              </Center>
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
              <Text>Success Rate: %84.4</Text>
              <Text>Average Number of Guesses: 4.6</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Spacer />
      <Text color="white" alignSelf="center" pb={6}>
        Nathan Huey &#169; 2022-2022 &#160; &#160;
        <Link href="https://github.com/njhuey" target="_blank">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </Link>
      </Text>
    </Flex>
  );
}
