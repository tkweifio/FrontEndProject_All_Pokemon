import React, { useEffect, useState, useRef } from 'react';
import { IonItem, IonButton, IonSlides, IonGrid, IonTabs, IonTab, IonTabBar, IonTabButton, IonToolbar, IonTitle, IonContent, IonHeader, IonLabel, IonRouterOutlet, IonFooter, IonCard } from '@ionic/react';
import { IonSlide, IonRow, IonCol, IonImg } from '@ionic/react';


export function Pokemon_Overview (props) {


        let [viewAllPokemon, setAllPokemon] = useState([]);




        useEffect(() => {

                fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0')
                .then(res => res.text())
                .then(res => {
            
                    alert(res);

                    let rows = res.toString().split('~~~');
            
                    for (let rownum = 0; rownum < rows.length - 1; ++rownum)
                    {
                        let cols = rows[rownum].split('|');
    
                        setAllPokemon((prevAllPokemon) => {
                            return prevAllPokemon.concat({
                                name: cols[0],
                                url: cols[1],
                            })
                        });
                    } 
                })
        }, []);


        return (
            <React.Fragment>

            <IonSlides pager='true' options={{direction: 'vertical'}}>
                {viewAllPokemon.map((detailData) =>   {
                        return (
                                <IonSlide >
                                                <IonImg className='pokemon_showcase_main' src={detailData.url} style={{width: '100%', height: '100%'}}></IonImg>
                                </IonSlide>
                        );
                    })}
            </IonSlides>
            
            </React.Fragment>

        )

    }