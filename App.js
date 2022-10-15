import { StyleSheet, Text, Button, View, TextInput, Picker, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

function UserScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if (email == "tv@gmail.com") {
      setEmail("");
      setFullname("")
      navigation.navigate('Profile', { fullname: fullname })
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputs}
	placeholder="Nombre Completo"
        onChangeText={value => setFullname(value)}
        value={fullname}
      />
      <TextInput
        style={styles.inputs}
	placeholder="Correo Electrónico"
        onChangeText={value => setEmail(value)}
        value={email}
      />
      <Button
        title="Perfil del Usuario"
        //onPress={() => navigation.navigate('Settings')}
        //onPress={validate}
        onPress={() => {
          if (email == "tv@gmail.com") {
            setEmail("");
            setFullname("")
            navigation.navigate('Profile', { fullname: fullname })
          }
        }}

      />
    </View>
  );
}

function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.fullname}</Text>
    </View>
  );
}

function AccountScreen() {
  const [accounttype, setAccounttype] = useState("");
  const [isfourth, setIsfourth] = useState(false);
  const toggleSwitch = () => setIsfourth(isActive => !isActive);
  return (
    <View style={styles.container}>
      <Text>Cuentas</Text>
      <Picker
        selectedValue={accounttype}
        style={{ height: 50, width: 350 }}
        onValueChange={(itemValue, itemIndex) => setAccounttype(itemValue)}
      >
        <Picker.Item label="Seleccione una opción" value=""  />
        <Picker.Item label="Cuenta de Ahorros" value="saccount" />
        <Picker.Item label="Cuenta Corriente" value="caccount" />
        <Picker.Item label="Tarjeta de Crédito" value="ccard" />
      </Picker>
      <View style={{flexDirection:'row',marginBottom:20,marginTop:10}}>
        <Text>Exenta de 4 por mil</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        style={{margin:20}}
        //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isfourth}
      />
      </View>
      <Button
        title='Chequear'
        onPress={()=>{
          alert(`tipo de cuenta: ${accounttype}, exenta: ${isfourth}`)
        }}
        padding='20'
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen name="User" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  }
});