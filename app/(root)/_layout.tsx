
import { Stack } from 'expo-router';

const Layout = () => {
  //SE COMENTÓ YA QUE ROMPÍA EL INICIO DE APP
  // const { isSignedIn } = useAuth();

  // if (isSignedIn) {
  //   return <Redirect href={'/'} />;
  // }

  return (
    
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       {/* <Stack.Screen name="find-ride" options={{ headerShown: false }} /> */}
       <Stack.Screen name="book-ride" options={{ headerShown: false }} />
       <Stack.Screen name="settings" options={{ headerShown: false }} />
       <Stack.Screen name="manual" options={{ headerShown: false }} />
       {/* <Stack.Screen name="safety" options={{ headerShown: false }} /> */}
       {/* <Stack.Screen name="fin-ride" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}

export default Layout;