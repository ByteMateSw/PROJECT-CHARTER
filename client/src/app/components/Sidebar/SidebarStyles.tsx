import { StylesConfig } from "react-select";

export const styleComboBox: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#FBFCFF",
    color: "#97989B",
    borderWidth: "1px",
    padding: "0.2rem",
    margin: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#97989B",
    borderRadius: "1rem",
    appearance: "none",
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: '110px',
    overflowY: 'scroll',
    flexDirection: 'column-reverse',
  })
};
