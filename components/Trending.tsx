import { icons } from '@/constants';
import { useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

type TrendingProps = {
  posts: {
    $id: string;
    thumbnail: string;
  }[];
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const onViewableItemsChanged = () => {}
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => (item as { $id: string }).$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      horizontal
    />
  );
};

type TrendingItemProps = {
  activeItem: TrendingProps['posts'][0];
  item: TrendingProps['posts'][0];
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);
  
  const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1 },
  };
  const zoomOut = {
    0: { scale: 1 },
    1: { scale: 0.9 },
  };

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className='text-white'>Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className='relative justify-center items-center'
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] mt-3 my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default Trending;
