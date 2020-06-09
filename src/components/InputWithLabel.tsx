import React from "react";
import {Input, Item, Label, NativeBase} from "native-base";
import {FormikProps} from "formik";

interface InputWithLabelProps extends NativeBase.Item {
    formikBag: FormikProps<any>
    label: string;
    name: string;
}


const InputWithLabel: React.FC<InputWithLabelProps> = (props: InputWithLabelProps) => {
    const {handleChange, handleBlur, values, isSubmitting} = props.formikBag;
    return (
        <Item floatingLabel  {...props}>
            <Label>{props.label}</Label>
            <Input label={undefined} disabled={isSubmitting}
                   onChangeText={handleChange(props.name)}
                   onBlur={handleBlur(props.name)}
                   value={values[props.name]}/>
        </Item>
    );
}

export default InputWithLabel;