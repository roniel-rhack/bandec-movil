import React from "react";
import {NativeBase, Picker} from "native-base";
import {FormikProps} from "formik";

export interface PickerYearProps extends NativeBase.Picker {
    firstYear?: number;
    lastYear?: number;
    name: string;
    formikBag: FormikProps<any>;
}

const PickerYear: React.FC<PickerYearProps> = ({formikBag, firstYear, lastYear, ...props}) => {
    if (!firstYear) firstYear = new Date().getFullYear();
    if (!lastYear) lastYear = firstYear + 11;
    const years: number[] = [];
    for (let i = firstYear; i <= lastYear; i++) {
        years.push(i);
    }
    const items = years.map((value, index) => {
        return <Picker.Item key={`pickYear_${value}_${index}`} label={`${value}`} value={`${value}`.slice(2)}/>
    })

    return (
        <Picker mode="dropdown" style={{width: 120}} selectedValue={formikBag.values[props.name]}
                onValueChange={formikBag.handleChange(props.name)} {...props}>
            {items}
        </Picker>
    );
}

export default PickerYear;