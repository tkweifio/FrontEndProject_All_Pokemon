import React from "react";
import { IonHeader, IonToolbar, IonItem, IonTitle, IonGrid, IonRow, IonCol, IonList, IonText, IonButtons, IonMenuButton } from '@ionic/react';

import '../css/pokemonApp.css';

 export function App_Header() {

    //alert('In Hotel_MerchantHomePage')

    return (
                <IonHeader className='appHeader'>
                    <IonToolbar color='dark' mode='md'>

                                    <IonTitle className='appHeader_title' > POKEMON </IonTitle>
 
                        <IonButtons slot='end'>
                            <IonMenuButton autoHide='false'></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>          
                </IonHeader>

    );
};
