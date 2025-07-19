import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { House, ScrollText } from 'lucide-react-native';

export default function Layout() {
    const {isSignedIn, isLoaded} = useUser()

    if(!isLoaded) return null

    if(!isSignedIn) return <Redirect href={"/sign-in"}/>


  return (
      <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: '#3E5F44',
        tabBarStyle: {
          backgroundColor: '#E8FFD7',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,
        }
        }}>
          <Tabs.Screen  name="index" options={{
            title: "Home",
              tabBarIcon: ({ color }) => <House size={28} color={color} />,
          }}/>

           <Tabs.Screen  name="transactions" options={{
            title: "Transactions",
            tabBarIcon: ({ color }) => <ScrollText size={28}  color={color} />,
          }}/>

          <Tabs.Screen  name="(transaction)" options={{
            href: null
          }}/>
      </Tabs>
  )


}