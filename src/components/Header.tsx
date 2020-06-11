import React from "react";
import {Body, Button, Container, Header, Icon, Left, Right, Title} from "native-base";
import {StackHeaderProps} from "@react-navigation/stack";

const HeaderComponent: React.FC<StackHeaderProps> = (props) => {
    const {navigation} = props;
    return (
        <Container>
            <Header>
                <Left>
                    {navigation.canGoBack()
                        ? <Button transparent onPress={() => {
                            navigation.goBack()
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                        : null
                    }
                </Left>
                <Body>
                    <Title>Bandec Móvil</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='menu'/>
                    </Button>
                </Right>
            </Header>
        </Container>
    )
};

export default HeaderComponent;