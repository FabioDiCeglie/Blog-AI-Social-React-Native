import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import { searchPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/UseAppWrite';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const { user, isBookmarkTab } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const { data: videos, refetch } = useAppWrite(() => searchPosts(query as string));

  useEffect(() => {
    refetch();
  }, [query]);

  if(isBookmarkTab && videos){
    videos.filter((video: any) => 
      video.liked.some((item: any) => item.$id === user.$id)
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={videos}
        keyExtractor={(item) => (item as { $id: string }).$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search results
            </Text>
            <Text className='text-xl font-psemibold text-white'>{query}</Text>

            <View className='mt-6 mb-8'>
            <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search'
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
