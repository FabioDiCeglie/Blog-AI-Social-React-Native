import { FlatList, Image, Text, View } from 'react-native';
import { images } from '@/constants';

type TrendingProps = {
  posts: {
    id: number;
  }[];
};

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text className='text-xl text-white'>{item.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
