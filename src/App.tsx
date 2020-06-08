import React, {Fragment} from "react";

const AppContent: React.FC<{}> = (props) => {
    const {children} = props;
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
export default AppContent;