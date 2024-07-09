import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SerachInput';
import Trending from '@/components/Trending';
import { images } from '@/constants';
import { getPosts } from '@/lib/appwrite';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Models } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [data, setData] = useState<Models.Document[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getPosts();
        
        if(!response) throw Error('Error fetching posts!')

        setData(response);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // re call videos -> if any new videos appeard
    setRefreshing(false);
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className='text-xl text-white'>{item.id}</Text>
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
