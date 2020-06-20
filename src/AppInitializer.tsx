import React, {useEffect, useState} from "react";
import AppNavigator from "./AppNavigator";
import {Root, Spinner} from "native-base";
import {connect} from "react-redux";
import {rootStateModel} from "./reducers";
import {ConfigsAppModel, ConfigsAppState} from "./reducers/ConfigsApp";
import {Dimensions, PermissionsAndroid} from "react-native";
import ImageBackground from "./components/ImageBackground";
import {LoadConfigsApp} from "./actions/ConfigsApp";

export interface AppInitializerProps {
    ConfigsApp: ConfigsAppModel;
    LoadConfigsApp: Function;
}

const {width: screenWidth} = Dimensions.get('window');

const AppInitializer: React.FC<AppInitializerProps> = ({ConfigsApp, ...props}) => {
    PermissionsAndroid.requestMultiple([
        "android.permission.CALL_PHONE", "android.permission.READ_PHONE_STATE",
        "android.permission.RECEIVE_SMS",
    ]);

    useEffect(() => {
        props.LoadConfigsApp();
    }, [])

    const colors = ["white", "yellow", "cyan", "cornflowerblue"]
    const [posColor, setPosColor] = useState(0);
    useEffect(() => {
        if (ConfigsApp.state === ConfigsAppState.none) {
            setTimeout(() => {
                setPosColor((posColor + 1) % colors.length)
            }, 1280)
        }
    }, [posColor])

    if (ConfigsApp.state === ConfigsAppState.none || ConfigsApp.state === ConfigsAppState.loading)
        return (
            <Root>
                <ImageBackground source={require('../images/BackgroundBandec.png')}/>
                <Spinner style={{position: "absolute", bottom: 20, left: (screenWidth / 2) - 20}}
                         color={colors[posColor]}/>
            </Root>
        );
    else
        return (
            <Root>
                <AppNavigator/>
            </Root>
        )
}

const mapStateToProps = (state: rootStateModel) => {
    return {
        ConfigsApp: state.ConfigsApp
    }
}

const mapDispatchToProps = {
    LoadConfigsApp
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInitializer);