import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import { Property, SearchFilters } from '../components';
import noresult from '../assets/images/noresult.svg';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  const propertiesHeading = router.query.purpose.toString().replace(/-/g, ' ');

  return (
    <Box>
      <Flex
        bg="gray.100"
        cursor="pointer"
        borderBottom="1px"
        borderColor="gray.200"
        p={2}
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon pl={2} w={7} as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p={4} fontWeight="bold">
        Properties {propertiesHeading}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={5}
          mb={5}
        >
          <Image src={noresult} alt="No Result" />
          <Text fontSize="2xl" mt={3}>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export const getServerSideProps = async ({ query }) => {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
};
export default Search;
