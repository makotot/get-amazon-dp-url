import { createGlobalStyle } from '@xstyled/styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f2f2f2;
  }

  a:focus,
  input:focus,
  button:focus {
    outline: none;
  }
`
