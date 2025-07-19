import { SignedIn, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const { user } = useUser()
  const username = user?.emailAddresses[0]?.emailAddress.split("@")[0] || "User"
  const router = useRouter()

  // Get current time for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening'

  return (
    <View className="flex-1 bg-[#E8FFD7] p-6">
      <SignedIn>
        {/* Header Card */}
        <View className="w-full flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-lg shadow-black/10 mb-6">
          {/* Avatar with border gradient effect */}
          <View className="border-2 border-emerald-400 rounded-full p-0.5">
            <Image
              className="w-20 h-20 rounded-full"
              source={require('@/assets/images/girl.png')}
            />
          </View>
          
          {/* User Info */}
          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold text-gray-800">
              Hi, {username}!
            </Text>
            <Text className="text-sm text-emerald-600">
              Good {greeting}!
            </Text>
          </View>
          
          {/* Settings button */}
          <TouchableOpacity className="bg-emerald-100 p-2 rounded-full">
            <Text className="text-emerald-800 text-lg">⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Cash In/Out Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            onPress={() => router.push('/cashin')}
            className="bg-white items-center justify-center p-6 rounded-2xl shadow-md shadow-black/10 flex-1 mr-3"
            activeOpacity={0.7}
          >
            <View className="bg-emerald-100 p-4 rounded-full mb-2">
              <BanknoteArrowUp size={24} color="#3E5F44" />
            </View>
            <Text className="text-[#3E5F44] font-semibold">Cash In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/cashout')}
            className="bg-white items-center justify-center p-6 rounded-2xl shadow-md shadow-black/10 flex-1 ml-3"
            activeOpacity={0.7}
          >
            <View className="bg-amber-100 p-4 rounded-full mb-2">
              <BanknoteArrowDown size={24} color="#3E5F44" />
            </View>
            <Text className="text-[#3E5F44] font-semibold">Cash Out</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions Section */}
        <View className="bg-white p-6 rounded-2xl shadow-lg shadow-black/10">
          <Text className="text-lg font-bold text-[#3E5F44] mb-4">
            Recent transactions:
          </Text>
          
          {/* Placeholder for transactions list */}
          <View className="items-center py-8">
            <Text className="text-gray-400">No recent transactions</Text>
          </View>
        </View>
      </SignedIn>
    </View>
  )
}