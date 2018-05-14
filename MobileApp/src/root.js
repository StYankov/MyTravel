import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {
    Icon
} from 'native-base';

import { Scene, Router, Stack, Drawer, Modal, Lightbox, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import HomePage from './Routes/Main/main';
import ResultList from './Routes/ResultList/results';
import Details from './Routes/Details/index';
import DrawerComponent from './Routes/Drawer/drawer';

import rightButton from './Routes/Details/Components/rightButtonWrapper';

import { HEADER_PURPLE } from './Configuration/colors';
import configureStore from './Store/createStore';

import LoadingView from './LoadingView';

import Login from './Routes/Authentication/Login/Login';
import Register from './Routes/Authentication/Register/Register';
import AboutUs from './Routes/AboutUs/Aboutus';
import Info from './Routes/Info/info';
import Map from './Routes/Map/Map';
import AllLines from './Routes/AllLines/index';
// Popups 
import WarningPopup from './PopUpScreen';
import MessageBox from './Routes/Details/MessageBox';
import ReviewPopup from './Routes/Details/ReviewPopup';
import ReportProblem from './Routes/Details/ReportProblem';
import AddLine from './Routes/AddLine/AddLine';
import AddLinePopUp from './Routes/AddLine/PopUpMsg';

const App = () => {
    // eslint-disable-next-line
    setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer);
    // eslint-disable-next-line
    setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer);
    // eslint-disable-next-line
    clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer);
    // eslint-disable-next-line
    clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer);

    const { store, persistor } = configureStore();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<LoadingView />}>
                <Router>
                    <Lightbox key="lightbox">

                        <Stack
                            key="root"
                            hideNavBar
                            navigationBarStyle={styles.navBarStyle}
                        >

                            <Drawer
                                key="drawer"
                                contentComponent={DrawerComponent}
                                hideNavBar
                            >
                                <Modal key="modal">
                                    <Scene
                                        key="landingPage"
                                        component={HomePage}
                                        hideNavBar
                                        title="HomePage"
                                        initial
                                    />
                                    <Scene
                                        key="Login"
                                        component={Login}
                                        hideNavBar
                                        title="Login"
                                    />
                                    <Scene
                                        key="Register"
                                        component={Register}
                                        hideNavBar
                                        title="Register"
                                    />
                                    <Scene
                                        hideNavBar={false}
                                        key="singleDetails"
                                        component={Details}
                                        title="Детайли"
                                        back
                                        backButtonTintColor="#FFF"
                                        headerMode="screen"
                                        titleStyle={{ color: '#fff' }}
                                        renderRightButton={rightButton}
                                    />
                                </Modal>
                                <Scene
                                    hideNavBar={false}
                                    key="allLines"
                                    component={AllLines}
                                    title="Транспортни линии"
                                    backButtonTintColor="#FFF"
                                    titleStyle={{ color: '#fff' }}
                                    drawerIcon={() => (<TouchableOpacity onPress={Actions.drawerOpen}>
                                        <Icon
                                            name="menu"
                                            size={25}
                                            style={{ color: '#fff', paddingLeft: 10 }}
                                        />
                                    </TouchableOpacity>)}
                                />
                            </Drawer>

                            <Stack
                                key="search"
                                navigationBarStyle={styles.navBarStyle}
                            >
                                <Scene
                                    key="results"
                                    direction="horizontal"
                                    animation="fade"
                                    back
                                    component={ResultList}
                                    backButtonTintColor="#FFF"
                                    headerMode="screen"
                                    titleStyle={{ color: '#ffffff' }}
                                    title="Резултати"
                                />
                                <Scene
                                    key="details"
                                    back
                                    component={Details}
                                    title="Детайли"
                                    backButtonTintColor="#FFF"
                                    headerMode="screen"
                                    titleStyle={{ color: '#fff' }}
                                    renderRightButton={rightButton}
                                />
                            </Stack>

                            <Scene
                                hideNavBar={false}
                                key="ReportProblem"
                                component={ReportProblem}
                                title="Докладвай за проблем"
                                backButtonTintColor="#fff"
                                titleStyle={{ color: '#fff' }}
                                back
                                navigationBarStyle={styles.navBarStyle}
                                onLeft={() => Actions.popTo('details')}
                            />
                            <Scene
                                hideNavBar={false}
                                key="RequestLine"
                                component={AddLine}
                                title="Предложи маршрут"
                                backButtonTintColor="#fff"
                                titleStyle={{ color: '#fff' }}
                                back
                                navigationBarStyle={styles.navBarStyle}
                                onLeft={() => Actions.pop()}
                            />
                            <Scene
                                hideNavBar={false}
                                key="AboutUs"
                                component={AboutUs}
                                title="За Нас"
                                backButtonTintColor="#fff"
                                titleStyle={{ color: '#fff' }}
                                back
                                navigationBarStyle={styles.navBarStyle}
                                onLeft={() => Actions.pop()}
                            />
                            <Scene
                                hideNavBar={false}
                                key="Info"
                                component={Info}
                                title="Полезна Информация"
                                backButtonTintColor="#fff"
                                titleStyle={{ color: '#fff' }}
                                back
                                navigationBarStyle={styles.navBarStyle}
                                onLeft={() => Actions.pop()}
                            />
                            <Scene
                                hideNavBar={false}
                                key="Map"
                                component={Map}
                                title="Карта"
                                backButtonTintColor="#fff"
                                titleStyle={{ color: '#fff' }}
                                back
                                navigationBarStyle={styles.navBarStyle}
                                onLeft={() => Actions.pop()}
                            />
                        </Stack>

                        <Scene key="WarningPopup" component={WarningPopup} />
                        <Scene key="MessageBox" component={MessageBox} />
                        <Scene key="ReviewPopup" component={ReviewPopup} />
                        <Scene key="AddLinePopUp" component={AddLinePopUp} />

                    </Lightbox>
                </Router>
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    navBarStyle: {
        backgroundColor: HEADER_PURPLE
    }
});

export default App;
