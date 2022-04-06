import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, IonTabs, IonTabBar, IonTabButton, IonContent,IonLabel} from '@ionic/react';

import Homepage from './pages/views/Pokemon_Homepage';

export function App () {


    return (<IonApp>
                <React.Fragment>
                        <IonRouterOutlet id='qavaAppConfirmed'>
                                    <Route path="/overviewTab" render={() => <Homepage />}/> 
                                    <Redirect exact={true} from='/' to='/overviewTab'/>
                        </IonRouterOutlet> 
                </React.Fragment>
            </IonApp>
        )
}

export default App;
