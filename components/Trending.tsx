import { icons } from '@/constants';
import { Video, ResizeMode, AVPlaybackStatusSuccess } from 'expo-av';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

type TrendingProps = {
  posts: {
    $id: string;
    key: string;
    video: string;
    thumbnail: string;
  }[];
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => (item as { $id: string }).$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
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
    1: { scale: 1.1 },
  };
  const zoomOut = {
    0: { scale: 1 },
    1: { scale: 0.9 },
  };

  return (
    <Animatable.View
      className='mr-5'
      //@ts-ignore
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ((status as AVPlaybackStatusSuccess).didJustFinish) {
              setPlay(false);
            }
          }}
        />
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
