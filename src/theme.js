import { createTheme, Text } from "@mantine/core";

const theme = createTheme({
  components: {
    Text: Text.extend({
      styles: {
        root: {
          overflowWrap: "anywhere",
        },
      },
    }),
  },
});

export default theme;
