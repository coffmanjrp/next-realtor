import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { ImageScrollbar } from '../../components';
import { baseUrl, fetchApi } from '../../utils/fetchApi';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  return (
    <Box maxWidth="1000px" m="auto" p={4}>
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p={6}>
        <Flex pt={2} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box pr={3} color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p={1}
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
          <BsGridFill />
        </Flex>
      </Box>
      <Box mt={2}>
        <Text fontSize="lg" mb={2} fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.600" style={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p={3}
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p={3}
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p={3}
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length && (
          <Text fontSize="2xl" fontWeight="bold" mt={5}>
            Facilites:
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities?.map((item) => (
            <div key={item.externalGroupID}>
              {item?.amenities?.map((amenity) => (
                <Text
                  key={amenity.externalID}
                  fontWeight="bold"
                  color="blue.400"
                  fontSize="l"
                  p="2"
                  bg="gray.200"
                  m="1"
                  borderRadius="5"
                >
                  {amenity.text}
                </Text>
              ))}
            </div>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
};

export default PropertyDetails;