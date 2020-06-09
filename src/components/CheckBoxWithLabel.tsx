import React from "react";
import {Body, CheckBox, ListItem, NativeBase, Text} from "native-base";
import {FormikProps} from "formik";

interface CheckBoxWithLabelProps extends NativeBase.ListItem {
    formikBag: FormikProps<any>
    label: string;
    name: string;
}

const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = (props: CheckBoxWithLabelProps) => {
    const {handleChange, setFieldValue, handleBlur, values, isSubmitting} = props.formikBag;

    return (
        <ListItem {...props}>
            <CheckBox checked={values[props.name]} onBlur={handleBlur(props.name)} color="red"
                      onPress={() => setFieldValue(props.name, !values[props.name])} disabled={isSubmitting}/>
            <Body>
                <Text>{props.label}</Text>
            </Body>
        </ListItem>
    );
}

export default CheckBoxWithLabel;