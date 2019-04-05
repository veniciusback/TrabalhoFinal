import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

export default class SobreScreen extends Component {
    //configurando opções de navegação
    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Sobre',
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image source={require('../img/cadastrar_ativo.png')}
                        style={{ width: 26, height: 26 }} />
                );
            } else {
                return (
                    <Image source={require('../img/cadastrar_inativo.png')}
                        style={{ width: 26, height: 26 }} />
                );
            }
        }
    });

    constructor(props) {
        super(props);
        this.state = {};
    }


    //https://www.comboinfinito.com.br/principal/wp-content/uploads/2018/05/homem-de-ferro-roubado.jpg
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.allViews}>
                    <ImageBackground resizeMode="cover" source={{ uri: 'https://i.ytimg.com/vi/7sBQpJiw-RI/maxresdefault.jpg' }}
                        style={styles.imagem}>
                        <View style={styles.textoView}>
                            <Text style={styles.texto}>Trabalho da Pós</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground resizeMode="stretch" source={{ uri: 'https://mundoonlinebr.files.wordpress.com/2012/05/homem-de-ferro-3.jpg' }}
                        style={styles.imagem}>
                        <View style={styles.textoView}>
                            <Text style={styles.texto}>Professor: Roberson Alves</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground resizeMode="cover" source={{ uri: 'https://www.ymda.com.br/wp-content/uploads/2018/08/Vingadores-Guerra-Infinita-_-Homem-de-ferro.jpg' }}
                        style={styles.imagem}>
                        <View style={styles.textoView}>
                            <Text style={styles.texto}>Aluno: Eduardo Antônio Uliana</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1    
    },
    allViews: {
        justifyContent: 'center',
        backgroundColor: 'black',
        flex: 1
    },
    imagem: {
        height: 170,
        width: '100%',
        flex: 1
    },
    textoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingLeft: 10,
        paddingBottom: 20
    },
    texto: {
        fontSize: 23,
        color: 'white',
        fontWeight: 'bold'
    }
});