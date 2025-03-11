import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    body: {
      bg: "#121213",
      color: "white",
    },
  },
};

const components = {
  Modal: {
    baseStyle: {
      dialog: {
        bg: "black",
      },
      header: {
        fontSize: "4xl",
      },
      body: {
        p: 8,
      },
    },
  },
};

const theme = extendTheme({
  styles,
  components,
});

export default theme;
