import React from "react";
import {Icon, Input, Item, Label, NativeBase, Toast} from "native-base";
import {FormikProps} from "formik";
import {cardNumberClear, cardNumberReformat} from "../utils/cardProcess";
import {KeyboardTypeOptions} from "react-native";

interface InputWithLabelProps extends NativeBase.Item {
    formikBag: FormikProps<any>
    label: string;
    name: string;
    cardNumber?: boolean;
    type?: "any" | "card number" | "code auth" | "card name",
    keyboardType?: KeyboardTypeOptions;
    setInputFocus?: Function;
}

const InputWithLabel: React.FC<InputWithLabelProps> = (props: InputWithLabelProps) => {
    const {handleChange, handleBlur, values, isSubmitting, errors} = props.formikBag;
    const handleChangeCustom = (name: string) => {
        const {type} = props;
        const handleChangeFormik = handleChange(name);
        if (type === "card number")
            return (text: any) => {
                const initVal = cardNumberClear(text);
                // @ts-ignore
                if (initVal.length > 16 || initVal != parseInt(initVal) && text !== "") return;
                handleChangeFormik(cardNumberReformat(initVal));
            }
        return handleChangeFormik;
    }
    return (
        <Item {...props} error={!!errors[props.name]}>
            <Label>{props.label}</Label>
            <Input label={undefined} disabled={isSubmitting || props.disabled}
                   onChangeText={handleChangeCustom(props.name)}
                   onBlur={handleBlur(props.name)} onFocus={() => {
                props.setInputFocus ? props.setInputFocus(props.name) : null
            }}
                   value={values[props.name]}
                   secureTextEntry={props.secureTextEntry} keyboardType={props.keyboardType}
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