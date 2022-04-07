import React, {useState, useEffect, useContext, useRef } from 'react';
import { IonModal, IonGrid, IonRow, IonCol, IonButton, IonSlides, IonSlide, IonContent, IonHeader, IonInput, IonFooter } from '@ionic/react';

import '../css/pokemonApp.css';

export function Pokemon_Details_Modal(props) {

    let [details, setDetails] = useState("fetching Overall Details");


    useEffect(() => {

            
            fetch(props.pokemonDetails)
            .then(res => res.text())
            .then(res => {

                setDetails(res);
        
            })
    }, []);

    //alert(details);

    return (
        <React.Fragment>
        <IonModal isOpen={true}>
        <IonHeader>
            <IonGrid>
                <IonRow>
                    <IonCol> Pokemon Details </IonCol>
                </IonRow>
            </IonGrid>
        </IonHeader>
        <IonGrid className='appContent_modal'>
            <IonRow>
                <IonCol>
                    <p >{details}</p>
                </IonCol>
            </IonRow>
        </IonGrid>
        <IonFooter>
            <IonButton className='apFooter_button_center' onClick={() => props.closeModal()}> Close </IonButton>
        </IonFooter>
        </IonModal>
    </React.Fragment>
    )
}