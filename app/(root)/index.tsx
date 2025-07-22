import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  const [balance, setBalance] = useState([]);

  const userId = user?.id;
  const username = user?.emailAddresses?.[0]?.emailAddress.split('@')[0] || 'User';

  
  
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  })();

  async function fetchData () {
    try {
      const response = await axios.get(`https://tcash-api.onrender.com/api/users/${userId}`);
      setBalance(response.data.user.balance)
    } catch (error) {
      console.log("Error fetching user", error)
    }
  }

  useEffect(()=>{
    fetchData()
  })

  return (
    <View className="flex-1 bg-[#E8FFD7] p-6">
      <SignedIn>
        {/* Header Card */}
        <View className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow mb-6">
          <View className="border-2 border-emerald-400 rounded-full p-0.5">
            <Image
              className="w-20 h-20 rounded-full"
              source={require('@/assets/images/girl.png')}
            />
          </View>

          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold text-gray-800">Hi, {username}!</Text>
            <Text className="text-sm text-emerald-600">Good {greeting}!</Text>
          </View>

          <TouchableOpacity className="bg-emerald-100 p-2 rounded-full">
            <SignOutButton />
          </TouchableOpacity>
          
        </View>

        <View className='flex bg-white mb-6 p-2 rounded-lg shadow'>
          <Text className='pl-4 text-xl text-[#3E5F44] font-medium'>Balance:</Text>
          <Text className="text-md font-bold text-lg text-[#5E936C]  mt-1 pl-4">
            ₱ {balance ?? '0.00'}</Text>
        </View>

        {/* Cash In / Cash Out */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            onPress={() => router.push('/cashin')}
            className="bg-white p-6 rounded-2xl shadow flex-1 mr-3 items-center"
          >
            <View className="bg-emerald-100 p-4 rounded-full mb-2">
              <BanknoteArrowUp size={24} color="#3E5F44" />
            </View>
            <Text className="text-[#3E5F44] font-semibold">Cash In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/cashout')}
            className="bg-white p-6 rounded-2xl shadow flex-1 ml-3 items-center"
          >
            <View className="bg-amber-100 p-4 rounded-full mb-2">
              <BanknoteArrowDown size={24} color="#3E5F44" />
            </View>
            <Text className="text-[#3E5F44] font-semibold">Cash Out</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View className="bg-white p-6 rounded-2xl shadow">
          <Text className="text-lg font-bold text-[#3E5F44] mb-4">Recent transactions:</Text>
          <View className="items-center py-8">
            <Text className="text-gray-400">No recent transactions</Text>
          </View>
        </View>
      </SignedIn>
    </View>
  );
}
