import React, { Component } from 'react';
import {
  StatusBar, View, ActivityIndicator,
  AsyncStorage, StyleSheet, Alert
} from 'react-native'

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

//telas criadas
import HomeScreen from './src/screen/HomeScreen';
import FilmeScreen from './src/screen/FilmeScreen';
import ListaFilmesScreen from './src/screen/ListaFilmesScreen';
import LoginScreen from './src/screen/LoginScreen';
import SobreScreen from './src/screen/SobreScreen';
import CameraScreen from './src/screen/CameraScreen';

import { openDatabase } from 'react-native-sqlite-storage';

//criar um objeto para representar banco de dados
var db = openDatabase({
  name: 'lapelicula.db'
});

class LoginLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.bootstrapAsync = this.bootstrapAsync.bind(this);

    this.bootstrapAsync();

    // criação das tabelas no banco de dados
    db.transaction(function (tx) {
      tx.executeSql('SELECT name FROM sqlite_master WHERE type = \'table\' AND name = \'filme\'',

        [], function (txp, res) {
          if (res.rows.length == 0) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS filme(codigo INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(200), imagem blob)', []);

            tx.executeSql('INSERT INTO filme(descricao) VALUES(\'filme 01\')', []);
            tx.executeSql('INSERT INTO filme(descricao) VALUES(\'filme 02\')', []);
            tx.executeSql('INSERT INTO filme(descricao) VALUES(\'filme 03\')', []);
          }
        })
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync() {
    let logado = 'false';
    AsyncStorage.getItem('logado').then((value) => {
      logado = value;
    });

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(logado == 'true' ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//criar navegador Stack
/*const NavegadorStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Filme: { screen: FilmeScreen },
  Lista: { screen: ListaFilmesScreen },
  Login: { screen: LoginScreen },
  Sobre: { screen: SobreScreen }
});*/

//navegacao por tab
const AppTab = createBottomTabNavigator({
  Lista: { screen: ListaFilmesScreen },
  Filme: { screen: FilmeScreen },
  Sobre: { screen: SobreScreen }
}, {
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#CCCCCC',
      style: {
        backgroundColor: '#570076'
      },
      indicatorStyle: {
        backgroundColor: null
      }
    }
  });

//criando navegador Stack
const AppStack = createStackNavigator({
  Login: LoginScreen,
  Camera: CameraScreen
});

const AppSwitch = createSwitchNavigator({
  LoginLoading: LoginLoadingScreen,
  App: AppTab,
  Auth: AppStack
}, {
    //para dizer que é para iniciar aqui por primeiro
    initialRouteName: 'LoginLoading'
  });


// container principal da aplicação
const App = createAppContainer(AppSwitch);
export default App;