import EmptyState from '@/components/EmptyState';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { images } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getLatestPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/UseAppWrite';
import React, { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const likedPosts = posts.filter((post: any) => 
    post.liked.some((item: any) => item.$id === user.$id)
  );

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={likedPosts}
        keyExtractor={(item) => (item as { $id: string }).$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-xl font-psemibold text-white'>
                  Saved Videos
                </Text>
              </View>
            </View>
            <SearchInput />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Saved'
            subtitle=''
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
