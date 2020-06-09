import React, {Fragment} from "react";
import AppNavigator from "./AppNavigator";

const AppInitializer: React.FC<{}> = (props: {}) => {
    return (
        <Fragment>
            <AppNavigator/>
        </Fragment>
    )
}
export default AppInitializer;