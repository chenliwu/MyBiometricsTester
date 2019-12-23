// Android平台生物识别错误代码
const BiometricsAndroidErrorCodeMap = new Map();

BiometricsAndroidErrorCodeMap.set('NOT_SUPPORTED', '设备不支持指纹/人脸识别！');
BiometricsAndroidErrorCodeMap.set('NOT_AVAILABLE', '设备的指纹/人脸识别不可用！');
BiometricsAndroidErrorCodeMap.set('NOT_ENROLLED', '设备未录入指纹/未录入人脸数据！');
BiometricsAndroidErrorCodeMap.set('AUTHENTICATION_FAILED', '识别失败！');
BiometricsAndroidErrorCodeMap.set('FINGERPRINT_ERROR_LOCKOUT', '尝试次数过多，请稍后再试！');
BiometricsAndroidErrorCodeMap.set('FINGERPRINT_ERROR_LOCKOUT_PERMANENT', '尝试次数过多，请稍后再试！');


// IOS平台错误代码
const BiometricsIosErrorNameMap = new Map();
BiometricsIosErrorNameMap.set('LAErrorAuthenticationFailed', '身份验证不成功，因为用户无法提供有效的凭据。');
BiometricsIosErrorNameMap.set('LAErrorPasscodeNotSet', '由于未在设备上设置密码，因此无法启动身份验证。');
BiometricsIosErrorNameMap.set('LAErrorTouchIDNotAvailable', '设备的指纹/人脸识别不可用！');
BiometricsIosErrorNameMap.set('LAErrorTouchIDNotEnrolled', '设备未录入指纹/未录入人脸数据！');
BiometricsIosErrorNameMap.set('RCTTouchIDUnknownError', '未知错误！');
BiometricsIosErrorNameMap.set('RCTTouchIDNotSupported', '设备的指纹/人脸识别不可用！');


export default class BiometricsUtils {

    /**
     * Android平台取消识别操作代码
     * @type {string}
     */
    static ANDROID_CODE_OPERATION_CANCEL = 'AUTHENTICATION_CANCELED';

    /**
     * IOS平台点击输入密码框事件代码
     * @type {string}
     */
    static IOS_NAME_ENTER_PASSWORD = 'LAErrorUserFallback';

    static getAndroidErrorDescription = (error) => {
        let result;
        let {code} = error;
        result = BiometricsAndroidErrorCodeMap.get(code);
        if (!result) {
            result = error.message;
        }
        return result;
    };
    static getIosErrorDescription = (error) => {
        let result;
        let {name} = error;
        result = BiometricsIosErrorNameMap.get(name);
        if (!result) {
            result = error.message;
        }
        return result;
    };


}
