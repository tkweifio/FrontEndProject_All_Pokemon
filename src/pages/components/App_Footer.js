import React, { useState } from 'react';
import { IonFooter, IonGrid, IonRow, IonCol, IonButton, IonToolbar } from '@ionic/react';

import '../css/pokemonApp.css';


 export function App_Footer() {

    return (

                <IonFooter className='appFooter'>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                {/*<IonButton  onClick={() => setShowContactInfoModal(true)}>CONTACT</IonButton>*/}
                                <IonButton  className='apFooter_button_center' >DETAILS</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonFooter>

    );
};
