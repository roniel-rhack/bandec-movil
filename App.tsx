import React, {useEffect, useState} from 'react';
import {Image, PermissionsAndroid} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    FooterTab,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Thumbnail,
    Title,
} from 'native-base';

import UssdDialer from './src/native/UssdDialer';
import AppInitializer from "./src/AppInitializer";

// @ts-ignore
import Ussd, {ussdEventEmitter} from 'react-native-ussd';
// @ts-ignore
import { DeviceEventEmitter } from 'react-native';

const SMS_RECEIVED_EVENT = 'com.centaurwarchief.smslistener:smsReceived';

const App = () => {
    const [javaMessage, setJavaMEssage] = useState('');


    useEffect(()=>{
        console.log('mounting ...');

       const mySubScription = DeviceEventEmitter.addListener(
            SMS_RECEIVED_EVENT,
            (message: any)=>{
                console.log(message);
            }
        );

        const eventListener = ussdEventEmitter.addListener('ussdEvent', (event: { ussdReply: string; }) => {
            try {
                let balance = event.ussdReply.split(',')[0].split(' ')[1];
                let date = event.ussdReply.split(' vence ')[0].split(' hasta ')[1];
                let mess = balance+' '+date;
                setJavaMEssage(mess);

                //SendIntentAndroid.sendPhoneCall("*133#", true);
            }catch (e){
                console.log(e);
            }

        });

        return ()=>{
            console.log('removing ...');
            eventListener.remove();
            mySubScription.remove();
        }
    }, []);

    const checkBalance = async () => {
        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
                title: 'I need to make some calls',
                message: 'Give me permission to make calls ',
                buttonPositive: 'ok'
            },
        );

        if (granted) {
            console.log('CAN Make Calls');
            Ussd.dial('*222#');
        } else {
            console.log('CALL MAKING Permission Denied');
        }
    };

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Bandec Movil</Title>
                </Body>
                <Right/>
            </Header>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('./images/I222.jpg')}/>
                            <Body>
                                <Text>Saldo Movil</Text>
                                <Text
                                    note>{new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image
                                source={require('./images/I222.jpg')}
                                style={{height: 200, width: 350, flex: 1, alignSelf: "center"}}
                            />
                            <Text>Your text here</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{color: '#87838B'}} onPress={async () => {
                                PermissionsAndroid.requestMultiple(["android.permission.CALL_PHONE", "android.permission.READ_PHONE_STATE",
                                    "android.permission.RECEIVE_SMS", "android.permission.READ_SMS"])
                                    .then(({"android.permission.CALL_PHONE": call, "android.permission.READ_PHONE_STATE": state,
                                               "android.permission.RECEIVE_SMS":receive_sms, "android.permission.READ_SMS":read_sms}) => {
                                        if (call === 'granted' && state === 'granted' && receive_sms==='granted' && read_sms === 'granted') {
                                            UssdDialer.autenticateUSSDCode("10289").then((message: string) => {
                                                setJavaMEssage(message);
                                                console.log(message);
                                            });
                                        }
                                    });
                            }}>
                                <Icon name="logo-github"/>
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button full onPress={()=>{
                        checkBalance();
                    }}>
                        <Text>{javaMessage}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

const AppReal: React.FC<{}> = (props) => {

    return (
        <AppInitializer/>
    );
};

export default AppReal;
