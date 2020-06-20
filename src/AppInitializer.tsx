import React from "react";
import AppNavigator from "./AppNavigator";
import {Root} from "native-base";
import {connect} from "react-redux";
import {rootStateModel} from "./reducers";
import {ConfigsAppModel} from "./reducers/ConfigsApp";
import {PermissionsAndroid} from "react-native";

export interface AppInitializerProps {
    ConfigsApp: ConfigsAppModel;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ConfigsApp, ...props}) => {
    PermissionsAndroid.requestMultiple(["android.permission.CALL_PHONE", "android.permission.CALL_PHONE",
    "android.permission.READ_SMS", "android.permission.RECEIVE_SMS"]);

    return (
        <Root>
            {/*<Text>{JSON.stringify(ConfigsApp, null, 2)}</Text>*/}
            <AppNavigator/>
        </Root>
    )
}

const mapStateToProps = (state: rootStateModel) => {
    return {
        ConfigsApp: state.ConfigsApp
    }
}
export default connect(mapStateToProps)(AppInitializer);