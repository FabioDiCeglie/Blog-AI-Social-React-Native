import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

type SearchInputProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  keyboardType?: string;
  otherStyles: string;
};

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  keyboardType,
  otherStyles,
  ...props
}: SearchInputProps) => {
  return (
    <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
