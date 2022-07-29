cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/admob-plus-cordova/www/admob.js",
        "id": "admob-plus-cordova.AdMob",
        "pluginId": "admob-plus-cordova",
        "clobbers": [
            "admob"
        ]
    },
    {
        "file": "plugins/admob-plus-cordova/src/browser/AdMobProxy.js",
        "id": "admob-plus-cordova.AdMobProxy",
        "pluginId": "admob-plus-cordova",
        "runs": true
    },
    {
        "file": "plugins/cordova-clipboard/www/clipboard.js",
        "id": "cordova-clipboard.Clipboard",
        "pluginId": "cordova-clipboard",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    },
    {
        "file": "plugins/cordova-plugin-codeplay-facebookads-free/www/codeplayfacebookads.js",
        "id": "cordova-plugin-codeplay-facebookads-free.codeplayfacebookads",
        "pluginId": "cordova-plugin-codeplay-facebookads-free",
        "clobbers": [
            "cordova.plugins.codeplayfacebookads"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
        "id": "cordova-plugin-insomnia.Insomnia",
        "pluginId": "cordova-plugin-insomnia",
        "clobbers": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/cordova-plugin-insomnia/src/browser/Insomnia.js",
        "id": "cordova-plugin-insomnia.InsomniaProxy",
        "pluginId": "cordova-plugin-insomnia",
        "merges": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar.Browser",
        "pluginId": "cordova-plugin-statusbar",
        "merges": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
        "id": "onesignal-cordova-plugin.OneSignal",
        "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
            "OneSignal"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "admob-plus-cordova": "1.27.0",
    "cordova-admob-sdk": "0.24.1",
    "cordova-clipboard": "1.3.0",
    "cordova-plugin-androidx": "3.0.0",
    "cordova-plugin-androidx-adapter": "1.1.3",
    "cordova-plugin-codeplay-facebookads-free": "0.0.1",
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-insomnia": "4.3.0",
    "cordova-plugin-splashscreen": "5.0.3",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-whitelist": "1.2.2",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "5.6.8",
    "cordova-support-google-services": "1.3.2",
    "cordova.plugins.diagnostic": "4.0.12",
    "onesignal-cordova-plugin": "2.4.6",
    "phonegap-plugin-multidex": "1.0.0"
}
// BOTTOM OF METADATA
});