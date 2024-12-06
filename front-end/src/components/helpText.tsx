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
              In the daily Wordle section, Wordle Guesser uses you, the user, to
              communicate with the official Wordle site owned by the New York
              Times. Wordle Guesser will provide you with a guess which you will
              then input into the official Wordle site, and then report back the
              color-coded results.
              <br />
              <br />
              First, navigate to{" "}
              <Link
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
              >
                https://www.nytimes.com/games/wordle/index.html
              </Link>
              . Wordle Guesser will provide you with a guess which you should
              input into the official Wordle site (&#34;cares&#34; is the first
              guess). The official Wordle site will then give you a color-coded
              response. Match the color combination for the current guess for
              Wordle Guesser (you can change the color by clicking the letters)
              and press submit. Wordle Guesser will then provide you with the
              next guess.
            </Box>
            <br />
            <Text fontSize="lg" as="b">
              To have Wordle Guesser solve a custom Wordle.
            </Text>
            <Box p={4}>
              In the Custom Wordle section, you can have Wordle Guesser solve
              for any five letter word as if it was the daily Wordle. Simply
              input any recognized five letter word into the space provided and
              press enter and Wordle Guesser will attempt to solve it as if it
              was the daily Wordle.
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HelpText;
