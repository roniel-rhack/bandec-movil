import React from "react";
import AppNavigator from "./AppNavigator";
import {Root} from "native-base";

const AppInitializer: React.FC<{}> = (props: {}) => {
    return (
        <Root>
            <AppNavigator/>
        </Root>
    )
}
export default AppInitializer;