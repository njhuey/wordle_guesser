import { useState } from "react";
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
} from "@chakra-ui/react";
import { GenerateWordle } from "../src/components/words";
import { makeRequest } from "../src/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [validWord, setValidWord] = useState("");
  const [customWords, setCustomWords] = useState([]);
  const [isError, setIsError] = useState(false);
  const [dailyWords, setDailyWords] = useState([]);

  const handleInputChange = (e: any) => {
    console.log(e);
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
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
    <Flex w="100%" h="100vh" bg="#121213" justify="center" flexDir="column">
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
            <Tab>Daily Wordle</Tab>
            <Tab>Custom Wordle</Tab>
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
          </TabPanels>
        </Tabs>
      </VStack>
      <Text color="white" alignSelf="center" pb={6}>
        Nathan Huey &#169; 2022-2022
      </Text>
    </Flex>
  );
}
