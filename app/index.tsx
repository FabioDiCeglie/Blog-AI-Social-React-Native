import { Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Homepage</Text>
      <Link href={'/profile'} style={{ color: 'blue'}} >Go to profile!</Link>
    </View>
  );
}
