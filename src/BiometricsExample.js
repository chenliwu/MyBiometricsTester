'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Platform
} from 'react-native';
import TouchID from 'react-native-touch-id';


const isAndroid = Platform.OS === 'android';
let authenticationReason = '解锁应用';
if(isAndroid){
    authenticationReason = null;
}


export default class BiometricsExample extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            biometryType: null,
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


                return TouchID.authenticate(authenticationReason,optionalConfigObject)
                    .then(success => {
                        alert('Authenticated Successfully');
                    })
                    .catch(error => {
                        console.log(error);
                        alert(error.message);
                    });

            })
            .catch(error => {
                alert('TouchID not supported');
            });
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
    btn: {
        borderRadius: 3,
        marginTop: 200,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#0391D7',
    },
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
