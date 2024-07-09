import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SerachInput';
import Trending from '@/components/Trending';
import { images } from '@/constants';
import { getPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/UseAppWrite';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { data: posts, isLoading, refetch } = useAppWrite(getPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  };
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className='text-xl text-white'>{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back
                </Text>
                <Text className='text-xl font-psemibold text-white'>
                  Welcome back
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput placeholder='Search for a video topic' />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className=' text-gray-100 text-lg font-pregular mb-3'>
                Latest videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
