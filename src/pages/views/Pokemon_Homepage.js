import React  from 'react';
import { IonContent, IonRouterOutlet } from '@ionic/react';


//import { App_Header } from '../components/App_Header';
import { Pokemon_Overview } from '../components/Tab_Overview';
//import { App_Footer } from '../components/App_Footer';


    function Homepage () {


        return (
            <React.Fragment>

                {/*<App_Header></App_Header>*/}

                <IonContent className='appContent'>

                    <Pokemon_Overview />

                </IonContent>
                

                {/*<App_Footer></App_Footer>*/}

            </React.Fragment>

        )

    }

    export default Homepage;