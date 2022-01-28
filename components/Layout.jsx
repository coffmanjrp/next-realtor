import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { Footer, Navbar } from '.';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Realtor</title>
      </Head>
      <Box maxW="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
};

export default Layout;
