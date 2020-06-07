import React, {Component} from 'react';
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

export default class App extends Component {
    componentDidMount(): void {

    }

    render() {
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
                                                UssdDialer.autenticateUSSDCode("10289");
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
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
