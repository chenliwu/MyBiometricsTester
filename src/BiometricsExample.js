'use strict';
import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Platform,
    Keyboard,
} from 'react-native';
import TouchID from 'react-native-touch-id';

import BiometricsUtils from './BiometricsUtils';


const isAndroid = Platform.OS === 'android';
let authenticationReason = '解锁应用';
if (isAndroid) {
    authenticationReason = null;
}


export default class BiometricsExample extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            biometryType: null,
            txtPassword: '',
        };
    }


    componentDidMount() {
        TouchID.isSupported()
            .then(biometryType => {
                console.log('biometryType:', biometryType);
                this.setState({biometryType});
            });
    }

    authenticate() {
        return TouchID.authenticate()
            .then(success => {
                alert('Authenticated Successfully');
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    react-native-touch-id
                </Text>

                <Text style={styles.instructions}>
                    {`设备支持类型：${this.state.biometryType}`}
                </Text>

                <TouchableHighlight
                    style={styles.btn}
                    onPress={this.passwordToUnlock}
                    underlayColor="#0380BE"
                    activeOpacity={1}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '600',
                    }}>
                        密码解锁
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.btn}
                    onPress={this._clickHandler}
                    underlayColor="#0380BE"
                    activeOpacity={1}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '600',
                    }}>
                        {`Authenticate with ${this.state.biometryType}`}
                    </Text>
                </TouchableHighlight>


            </View>
        );
    }


    passwordToUnlock = () => {
        Alert.prompt(
            '密码解锁',
            '请输入登录密码',
            [
                {
                    text: '取消', onPress: function () {
                    },
                },
                {
                    text: '确认', onPress: (text) => {
                        this.setState({
                            txtPassword: text,
                        });
                        if (!this.state.txtPassword) {
                            alert('温馨提示', '请输入密码！');
                            return;
                        }
                        Keyboard.dismiss();
                        alert('输入的密码为：' + this.state.txtPassword);
                        this.setState({
                            txtPassword: '',
                        });
                    },
                },
            ],
            'secure-text',
            this.state.txtPassword,
            'default',
        );
    };

    _clickHandler() {

        const optionalConfigObject = {
            title: '应用解锁', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: '验证手机已有指纹', // Android
            sensorErrorDescription: '验证失败', // Android
            cancelText: '取消', // Android
            fallbackLabel: '登录密码解锁', // iOS (if empty, then label is hidden)
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };


        TouchID.isSupported()
            .then((biometryType) => {
                console.log('click handle:', biometryType);


                return TouchID.authenticate(authenticationReason, optionalConfigObject)
                    .then(success => {
                        alert('Authenticated Successfully');
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('authenticate.error', error);
                        console.log('authenticate.error.details', error.details);
                        let msg = `code:${error.code},name:${error.name},message:${error.message},details:${error.details}`;
                        // alert(msg);
                        if (isAndroid) {
                            if (error.code != BiometricsUtils.ANDROID_CODE_OPERATION_CANCEL) {
                                msg = BiometricsUtils.getAndroidErrorDescription(error);
                            }else{
                                msg = "取消操作";
                            }
                        } else {
                            if(error.name == 'LAErrorUserFallback'){
                                msg = '输入密码事件';
                            } else if(error.name == 'LAErrorTouchIDNotEnrolled'){
                                msg = '设备未录入指纹/未录入人脸数据！';
                            }
                        }
                        alert(msg);
                        // if(error.message == errors.LAErrorUserFallback){
                        //     this.passwordToUnlock();
                        // }
                    });

            })
            .catch(error => {
                alert('TouchID not supported');
            });
    }

    handleAndroidError = (error) => {
        let {code} = error;
        if (code) {

        }
    };

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

const errors = {
    'LAErrorAuthenticationFailed': 'Authentication was not successful because the user failed to provide valid credentials.',
    'LAErrorUserCancel': 'Authentication was canceled by the user—for example, the user tapped Cancel in the dialog.',
    'LAErrorUserFallback': 'Authentication was canceled because the user tapped the fallback button (Enter Password).',
    'LAErrorSystemCancel': 'Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up.',
    'LAErrorPasscodeNotSet': 'Authentication could not start because the passcode is not set on the device.',
    'LAErrorTouchIDNotAvailable': 'Authentication could not start because Touch ID is not available on the device',
    'LAErrorTouchIDNotEnrolled': 'Authentication could not start because Touch ID has no enrolled fingers.',
    'RCTTouchIDUnknownError': 'Could not authenticate for an unknown reason.',
    'RCTTouchIDNotSupported': 'Device does not support Touch ID.',
};
