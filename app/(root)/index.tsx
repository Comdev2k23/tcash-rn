import { SignOutButton } from '@/components/SignOutButton'
import { SignedIn, useUser } from '@clerk/clerk-expo'
import { Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()

  return (
    <View className='flex-1 bg-[#E8FFD7] '>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}