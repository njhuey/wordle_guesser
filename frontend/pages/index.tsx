import {
  Flex,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  VStack,
  Spacer,
  Divider,
  Center,
  Text,
} from "@chakra-ui/react";

import DailyWordle from "../src/views/dailyWordle";
import CustomWordle from "../src/views/customWordle";
import Info from "../src/views/info";

export default function Home() {
  return (
    <Flex w="100%" minH="100vh" flexDir="column">
      <VStack w="100vw" h="100%">
        <Flex w="100%" align="center" justify="center">
          <Text fontSize="6xl" as="b">
            Wordle Guesser
          </Text>
        </Flex>
        <Divider />
        <Tabs
          variant="solid-rounded"
          colorScheme="grey"
          align="center"
          w="80%"
          pt={4}
        >
          <TabList mb="20px">
            <Tab w="3xs">Daily Wordle</Tab>
            <Tab w="3xs">Custom Wordle</Tab>
            <Tab w="3xs">Info</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>
                <DailyWordle />
              </Center>
            </TabPanel>
            <TabPanel>
              <CustomWordle />
            </TabPanel>
            <TabPanel>
              <Info />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      <Spacer />
      <Text color="white" alignSelf="center" pb={6}>
        Nathan Huey &#169; 2022-2025 &#160; &#160;
      </Text>
    </Flex>
  );
}
