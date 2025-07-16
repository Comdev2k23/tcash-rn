import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >

      <View className="flex-1 bg-[#93DA97] justify-center p-6">
      {/* Header with Logo */}
      <View className="items-center mb-8">
        <Image 
          source={require('@/assets/images/signin.png')} 
          className="w-52 h-52 mb-4"
        />
        <Text className="text-3xl font-bold text-[#3E5F44]">Welcome Back</Text>
        <Text className="text-[#E8FFD7] mt-2">Sign in to continue</Text>
      </View>

      {/* Form */}
      <View className="space-y-4">
        <View className='mt-3'>
          <Text className="text-[#3E5F44] mb-1">Email</Text>
          <TextInput
            className="bg-[#E8FFD7] p-4 rounded-lg border border-gray-200"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="your@email.com"
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />
        </View>

        <View className='mt-3'>
          <Text className="text-[#3E5F44] mb-1">Password</Text>
          <TextInput
            className="bg-[#E8FFD7] p-4 rounded-lg border border-gray-200"
            value={password}
            placeholder="••••••••"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          className="bg-[#3E5F44] p-4 rounded-lg items-center mt-4"
          onPress={onSignInPress}
        >
          <Text className="text-[#E8FFD7] font-semibold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center pt-4">
          <Text className="text-[#E8FFD7]">Don&apos;t have an account? </Text>
          <Link href="/sign-up" className="text-[#3E5F44] font-medium">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}