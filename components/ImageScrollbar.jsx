import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" mr={1}>
      <Icon
        as={FaArrowAltCircleLeft}
        fontSize="2xl"
        cursor="pointer"
        onClick={() => scrollPrev()}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" mr={1}>
      <Icon
        as={FaArrowAltCircleRight}
        fontSize="2xl"
        cursor="pointer"
        onClick={() => scrollNext()}
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: 'hidden' }}
    >
      {data.map((item) => (
        <Box key={item.id} itemID={item.id} width="910px" overflow="hidden">
          <Image
            src={item.url}
            alt="Property"
            placeholder="blur"
            blurDataURL={item.url}
            width={1000}
            height={500}
            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
