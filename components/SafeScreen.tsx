import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SafeScreen({children}: {children : React.ReactNode}) {
    const insets = useSafeAreaInsets()

  return (
  <View style={{paddingTop: insets.top, flex: 1, backgroundColor: '#93DA97'}}>
      {children}
    </View>
  )
}