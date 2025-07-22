import React from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Profile() {
  return (
    <KeyboardAwareScrollView 
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
    >
        <View className='flex-1 bg-[#E8FFD7]'>
            <Text>Profile</Text>
        </View>
    </KeyboardAwareScrollView>
  )
}