'use strict';
import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    Button,
    View,
    Platform,
    Keyboard,
} from 'react-native';

import RNBiometrics from 'react-native-biometrics-lib';


export default class TestMyAndroidBiometricsExample extends Component<{}> {
    constructor(props) {
        super(props);

    }


    componentDidMount() {

    }

    authenticate() {

    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    测试Android平台的生物识别库
                </Text>

                <Button title={'测试isSupported接口'} onPress={() => {
                    RNBiometrics.isSupported()
                        .then((biometricsType)=>{
                            console.log("");
                            console.log("then",biometricsType);
                        })
                        .catch((error)=>{
                            console.log("");
                            console.log("catch",error);
                        });
                }}/>


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        margin: 10,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    instructions: {
        marginBottom: 5,
        color: '#333333',
        fontSize: 13,
        textAlign: 'center',
    },
    btn: {},
});
