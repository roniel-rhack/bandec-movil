import React from "react";
import {Icon, Input, Item, Label, NativeBase, Toast} from "native-base";
import {FormikProps} from "formik";

interface InputWithLabelProps extends NativeBase.Item {
    formikBag: FormikProps<any>
    label: string;
    name: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = (props: InputWithLabelProps) => {
    const {handleChange, handleBlur, values, isSubmitting, errors} = props.formikBag;

    return (
        <Item floatingLabel {...props} error={!!errors[props.name]}>
            <Label>{props.label}</Label>
            <Input label={undefined} disabled={isSubmitting || props.disabled}
                   onChangeText={handleChange(props.name)}
                   onBlur={handleBlur(props.name)}
                   value={values[props.name]}
                   secureTextEntry={props.secureTextEntry}
            />
            {!!errors[props.name]
                ? <Icon name="close-circle" onPress={() =>
                    Toast.show({
                        // @ts-ignore
                        text: errors[props?.name],
                        duration: 3500,
                        buttonText: "Leido"
                    })}/>
                : null}
        </Item>
    );
}

export default InputWithLabel;