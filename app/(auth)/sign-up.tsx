import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
     <View className='bg-[#93DA97] flex-1 justify-center items-center'>
        <Text className='text-3xl font-semibold text-[#3E5F44]'>Verify your email</Text>
        <TextInput
          className="bg-[#E8FFD7] p-4 rounded-lg border border-gray-200 mt-4"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} 
          className='mt-4 bg-[#3E5F44] p-4 rounded-lg'
        >
          <Text className='text-[#E8FFD7]'>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
   <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
   >

       <View className='flex-1 bg-[#93DA97]  justify-center p-6'>

        <View className='items-center mb-8'>
          <Image 
            source={require('@/assets/images/signup.png')}
            className="w-52 h-52 mb-4"
          />
          <Text className='text-3xl font-bold text-[#3E5F44]'>Create Account</Text>
          <Text className='text-[#E8FFD7] mt-2'>Sign up to continue</Text>
        </View>

        {/* Form */}
        <View className='space-y-4'>
          <View className='mt-3'>
            <Text className='text-[#3E5F44] mb-1'>Email</Text>
            <TextInput 
            className='bg-[#E8FFD7] p-4 rounded-lg border border-gray-200'
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
            keyboardType="email-address"
          />
        </View>

        <View className='mt-3'>
          <Text className='text-[#3E5F44] mb-1'>Password</Text>
          <TextInput
          className='bg-[#E8FFD7] p-4 rounded-lg border border-gray-200'
          value={password}
          placeholder="••••••••"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        </View>

        <TouchableOpacity onPress={onSignUpPress}
        className='bg-[#3E5F44] p-4 rounded-lg items-center mt-4'
        >
          <Text className='text-[#E8FFD7] font-semibold'>Continue</Text>
        </TouchableOpacity>
        </View>

        <View className='flex-row gap-3 justify-center pt-4'>
          <Text className='text-[#E8FFD7] '>Already have an account?</Text>
          <Link href="/sign-in">
            <Text className='text-[#3E5F44]'>Sign in</Text>
          </Link>
        </View>
      
    </View>
   </KeyboardAwareScrollView>
  )
}