import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import { filterData, getFilterValues } from '../utils/filterData';
import noresult from '../assets/images/noresult.svg';

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg="gray.100" p={4} justifyContent="center" flexWrap="wrap">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p={2}
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir="column">
        <Button
          border="1px"
          borderColor="gray.200"
          mt={2}
          onClick={() =>
            setShowLocations((prevShowLocation) => !prevShowLocation)
          }
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir="column" pos="relative" pt={2}>
            <Input
              w="300px"
              focusBorderColor="gray.300"
              value={searchTerm}
              placeholder="Type Here"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                top={5}
                right={5}
                zIndex="100"
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner m="auto" mt={3} />}
            {showLocations && (
              <Box h="300px" overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p={2}
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
            {!loading && !locationData?.lenght && (
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                mt={5}
                mb={5}
              >
                <Image src={noresult} alt="No Result" />
                <Text fontSize="xl" mt={3}>
                  Waiting to search!
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
