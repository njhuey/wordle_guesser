import { useEffect, useState } from "react";
import {
  Button,
  Text,
  Box,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function HelpText() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      onOpen();
      setFlag(false);
    }
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Click here for Usage Guide
      </Button>

      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center" as="b">
            Instructions
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" as="b">
              To interactively solve the Daily Wordle:
            </Text>
            <Box p={4}>
              In the daily wordle section, WordleBot uses you, the user, to
              communicate with the official Wordle site owned by the New York
              Times. WordleBot will provide you with a guess which you will then
              input into the official Wordle site and report back the
              information.
              <br />
              <br />
              First, navigate to{" "}
              <Link
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
              >
                https://www.nytimes.com/games/wordle/index.html
              </Link>
              . Wordlebot will provide you with a guess which you should input
              into the official Wordle site (&#34;cares&#34; is the first
              guess). The official wordle site will then give you a color-coded
              response. Match the color combination on WordleBot (you can change
              the color by clicking the letters) and press submit. WordleBot
              will then provide you with the next guess.
            </Box>
            <br />
            <Text fontSize="lg" as="b">
              To have WordleBot solve a Custom Wordle.
            </Text>
            <Box p={4}>
              In the Custom Wordle section, you can have WordleBot solve any
              five letter word. Simply input any valid five letter word into the
              space provided and press enter and WordleBot will attempt to solve
              it as if it was the daily wordle.
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HelpText;
