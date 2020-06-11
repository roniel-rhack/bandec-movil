import React from "react";
import {Body, CheckBox, Icon, ListItem, NativeBase, Right, Text, Toast} from "native-base";
import {FormikProps} from "formik";

interface CheckBoxWithLabelProps extends NativeBase.ListItem {
    formikBag: FormikProps<any>
    label: string;
    name: string;
    explain?: string;
}

const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = (props: CheckBoxWithLabelProps) => {
    const {setFieldValue, handleBlur, values, isSubmitting} = props.formikBag;

    return (
        <ListItem {...props}>
            <CheckBox checked={values[props.name]} onBlur={handleBlur(props.name)} color="red"
                      onPress={() => setFieldValue(props.name, !values[props.name])} disabled={isSubmitting}/>
            <Body>
                <Text>{props.label}</Text>
            </Body>
            <Right>
                <Icon color="#FF0000" name="alert" onPress={() => Toast.show({
                    text: `Si habilita esta opción la proxima vez que ingrese a la aplicación la autenticación se` +
                        ` realizara de forma automática.`,
                    duration: 15000,
                    buttonText: "Leido"
                })}/>
            </Right>
        </ListItem>
    );
}

export default CheckBoxWithLabel;