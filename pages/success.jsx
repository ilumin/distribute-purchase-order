import { Flex, Link, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Distribute Product Order</title>
      </Head>
      <Flex align="center" justifyContent="center" height="100vh">
        <Stack>
          <NextLink href="/cart">
            <Link>Go To Cart</Link>
          </NextLink>
          <NextLink href="/">
            <Link>Go To Home</Link>
          </NextLink>
        </Stack>
      </Flex>
    </>
  )
}
