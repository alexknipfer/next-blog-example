import Image from 'next/image';
import { HStack, Box, Text } from '@chakra-ui/react';

interface Props {
  name: string;
  title: string;
  profilePicture: string;
}

const Author: React.FC<Props> = ({ name, title, profilePicture }) => (
  <HStack my={3}>
    <Image
      width={50}
      height={50}
      src={profilePicture}
      className="profile-image"
    />
    <Box>
      <Text color="gray.300">{name}</Text>
      <Text color="gray.400">{title}</Text>
    </Box>
    <style jsx global>{`
      .profile-image {
        border-radius: 50%;
      }
    `}</style>
  </HStack>
);

export default Author;
