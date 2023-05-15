import {
  Preflight,
  ThemeProvider,
  defaultTheme,
} from '@xstyled/styled-components'
import { x } from '@xstyled/styled-components'
import { useState } from 'react'
import { Amazon, Github } from '@styled-icons/boxicons-logos'
import { Clipboard } from '@styled-icons/boxicons-regular'
import toast, { Toaster } from 'react-hot-toast'
import { GlobalStyle } from './GlobalStyle'

const theme = {
  ...defaultTheme,
}

const isValidUrl = (value: string) => {
  let url: URL | undefined

  try {
    url = new URL(value)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

const generateDetailPageUrl = (value: string) => {
  const url = new URL(value)
  const dp = url.pathname.match(/dp\/\w+/)?.[0] || ''

  return `https://amazon.co.jp/${dp}`
}

export const App = () => {
  const [value, updateValue] = useState('')
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    if (!isValidUrl(value)) {
      toast.error('Invalid url.')
      return
    }

    const url = generateDetailPageUrl(value)
    navigator.clipboard.writeText(url).then(() => {
      toast.success(() => (
        <div>
          Copied!
          <br />
          <x.a href={url} target="_blank" color="#232f3e">
            {url}
          </x.a>
        </div>
      ))
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />

      <x.div h="100%">
        <x.div display="flex" flexDirection="column" h="100%">
          <x.header backgroundColor="#232f3e">
            <x.div
              paddingTop={4}
              paddingBottom={4}
              w="calc(100% - 10vw)"
              margin="0 auto">
              <x.h1
                fontSize={24}
                textTransform="uppercase"
                fontWeight={600}
                color="#fff">
                Get{' '}
                <Amazon
                  size={40}
                  color="#FF9900"
                  role="img"
                  aria-label="a"
                  aria-hidden={false}
                />
                mazon Dp Url
              </x.h1>
            </x.div>
          </x.header>
          <x.form
            onSubmit={handleSubmit}
            flexGrow={1}
            w="calc(100% - 10vw)"
            margin="0 auto"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <x.div display="flex" w="100%">
              <x.input
                type="text"
                value={value}
                onChange={(e) => updateValue(e.currentTarget.value)}
                borderColor="#232f3e"
                backgroundColor="#fff"
                color="#232f3e"
                flexGrow={1}
                padding={4}
                borderWidth={1}
                ringInset
                ring={{ focus: 1 }}
                placeholder="https://www.amazon.co.jp/..."
              />
              <x.button
                type="submit"
                padding={4}
                borderWidth={1}
                borderColor="#232f3e"
                backgroundColor="#232f3e"
                color="#fff"
                ringInset
                ring={{ focus: 1 }}>
                <Clipboard size={16} />
              </x.button>
            </x.div>
          </x.form>
          <x.footer
            paddingTop={4}
            paddingBottom={4}
            w="calc(100% - 10vw)"
            margin="0 auto"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <x.a
              href="https://github.com/makotot/get-amazon-dp-url"
              target="_blank"
              ringInset
              ring={{ focus: 1 }}>
              <Github size={32} color="#232f3e" />
            </x.a>
          </x.footer>
        </x.div>
      </x.div>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
