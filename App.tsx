import React, {useState} from 'react';
import {Image, PermissionsAndroid, YellowBox} from 'react-native';
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
import {Provider} from "react-redux";
import store from "./src/store";

const App = () => {
    const [javaMessage, setJavaMEssage] = useState('');

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
                                PermissionsAndroid.requestMultiple(["android.permission.CALL_PHONE", "android.permission.READ_PHONE_STATE"])
                                    .then(({"android.permission.CALL_PHONE": call, "android.permission.READ_PHONE_STATE": state}) => {
                                        if (call === 'granted' && state === 'granted') {
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
                    <Button full>
                        <Text>{javaMessage}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

const AppReal: React.FC<{}> = (props) => {
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified.']);
    return (
        <Provider store={store}>
            <AppInitializer/>
        </Provider>
    );
};

export default AppReal;
