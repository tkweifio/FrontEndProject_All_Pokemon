import React, { useEffect, useState, useRef } from 'react';
import { IonItem, IonButton, IonSlides, IonGrid, IonTabs, IonTab, IonTabBar, IonTabButton, IonToolbar, IonTitle, IonContent, IonHeader, IonLabel, IonRouterOutlet, IonFooter, IonCard, IonText, IonIcon, IonInput } from '@ionic/react';
import { IonSlide, IonRow, IonCol, IonImg } from '@ionic/react';

import '../css/pokemonApp.css';

import {Pokemon_Details_Modal } from './Pokemon_Details_revised';

export function Pokemon_Overview (props) {


        let [viewAllPokemon, setAllPokemon] = useState([]);

        let [viewAllPokemon_filtered, setAllPokemon_filtered] = useState([]);

        let [viewsPerSlide, setViewsPerSlide] = useState(10);
        let [viewsPerSlide_10_button, setViewsPerSlide_10_button] = useState('outline');
        let [viewsPerSlide_20_button, setViewsPerSlide_20_button] = useState(null);
        let [viewsPerSlide_50_button, setViewsPerSlide_50_button] = useState(null);

        let [details_modal, setDetails_modal] = useState(false);
        let [pokemonOverallDetails, setPokemonOverallDetails] = useState(null);

        let searchListRef_name = useRef('');
        let searchListRef_abilities = useRef('');



        useEffect(() => {

                fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0')
                .then(res => res.json())
                .then(res => {
            
                    //alert(res);
                    //alert(Object.entries(res));
                    //alert(Object.entries(res.results).length);
            
                    for (let rownum = 0; rownum < 20; ++rownum)
                    {

                        fetch(Object.entries(res.results[rownum])[1][1])
                        .then(res2 => res2.json())
                        .then(res2 => {

                                alert(Object.entries(res2.abilities).length);
                                alert(res2.abilities.length);

                                //alert(Object.entries(res2.abilities[0].ability));
                                //alert(Object.entries(res2.abilities[1].ability));
                                //alert(Object.entries(res2.abilities[1].ability)[0]);
                                //alert(Object.entries(res2.abilities[1].ability)[0][0]);
                               // alert(Object.entries(res2.abilities[1].ability)[0][1]);

                                let listOfAbilities = [];

                                for(let row2 = 0; row2 < Object.entries(res2.abilities).length; ++row2)
                                {
                                    listOfAbilities.push(Object.entries(res2.abilities[row2].ability)[0][1]);

                                    alert(listOfAbilities[row2]);

                                } 

                                setAllPokemon((prevAllPokemon) => {
                                    return prevAllPokemon.concat({
                                        id: rownum,
                                        name: Object.entries(res.results[rownum])[0][1],
                                        url: Object.entries(res.results[rownum])[1][1],
                                        image: res2.sprites.other['official-artwork'].front_default,
                                        height: res2.height,
                                        weight: res2.weight,
                                        abilities: listOfAbilities.toString(),
                                    })
                                });
                        })

                        /*setAllPokemon((prevAllPokemon) => {
                            return prevAllPokemon.concat({
                                id: rownum,
                                name: Object.entries(res.results[rownum])[0][1],
                                url: Object.entries(res.results[rownum])[1][1],
                            })
                        });*/
                    } 
                })
        }, []);

        /*useEffect(() => {


        }, [viewAllPokemon])*/

        function handleSortList(e)
        {
            //e.persist();
            //e.preventDefault();
            //alert(e);

            if(e.target.value == 'name')
            {
                //setAllPokemon((prevAllPokemon) => {
                //    return prevAllPokemon.concat(viewAllPokemon.sort((a, b) => a.name > b.name ? 1 : -1))
                //});
                const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                    
                        return a.name > b.name ? 1 : -1
                    });

                setAllPokemon(sortedData);

                //alert(Object.entries(viewAllPokemon[0]));
            }
            if(e.target.value == 'height')
            {
                //setAllPokemon((prevAllPokemon) => {
                //    return prevAllPokemon.concat(viewAllPokemon.sort((a, b) => a.height > b.height ? 1 : -1))
                //});
                const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                    return a.height > b.height ? 1 : -1
                });

                setAllPokemon(sortedData);

                //alert(Object.entries(viewAllPokemon[0]));

            }
            if(e.target.value == 'weight')
            {
                //setAllPokemon((prevAllPokemon) => {
                //    return prevAllPokemon.concat(viewAllPokemon.sort((a, b) => a.weight > b.weight ? 1 : -1))
                //});
                const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                    return a.weight > b.weight ? 1 : -1
                });

                setAllPokemon(sortedData);
                //alert(Object.entries(viewAllPokemon[0]));

            }
        }

        function handleSearchList_name()
        {
            //const keyword = "Sar";

            const filtered = viewAllPokemon.filter(entry => Object.values(entry.name).some(val => typeof val === "string" && val.includes(searchListRef_name.current.value)));
            /*const filtered = () => [...viewAllPokemon].filter((entry) => {
                
                return entry.name.includes(searchListRef_name.current.value)
            });*/

            //alert(filtered);
            //alert(filtered.length);

            /*alert(filtered);
            alert(Object.entries(filtered[0]));
            alert(Object.keys(filtered[0]));
            alert(filtered[0].name);
            alert(filtered[0].url);
            alert(filtered[0].image);*/

            //setAllPokemon_filtered(filtered);

            
            for (let rownum = 0; rownum <= filtered.length - 1; ++rownum)
            {

                setAllPokemon_filtered((prevAllPokemon_filtered) => {
                    return prevAllPokemon_filtered.concat({
                        id: rownum,
                        name: filtered[rownum].name,
                        url: filtered[rownum].url,
                        image: filtered[rownum].image,
                        height:filtered[rownum].height,
                        weight: filtered[rownum].weight,
                        abilities: filtered[rownum].abilities,

                    })
                });
            }
            //alert(Object.entries(viewAllPokemon[0]));

        }

        function handleSearchList_abilities()
        {
            //const keyword = "Sar";

            const filtered = viewAllPokemon.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchListRef_abilities.current.value)));

            for (let rownum = 0; rownum <= filtered.length - 1; ++rownum)
            {

                setAllPokemon_filtered((prevAllPokemon_filtered) => {
                    return prevAllPokemon_filtered.concat({
                        id: rownum,
                        name: filtered[rownum].name,
                        url: filtered[rownum].url,
                        image: filtered[rownum].image,
                        height:filtered[rownum].height,
                        weight: filtered[rownum].weight,
                        abilities: filtered[rownum].abilities,

                    })
                });
            }
        }

        function nextSlide()
        {
            //const swiper = mySlides.current.getSwiper();
            document.getElementById('viewAllPokemonSlides').slideNext();
        }
        function prevSlide()
        {
            //const swiper = mySlides.current.getSwiper();
            document.getElementById('viewAllPokemonSlides').slidePrev();
        }

        function detailsModalHandler(event)
        {
            setPokemonOverallDetails(event[1]);
            setDetails_modal(event[0]);
        }

        function setViewsPerSlideHandler(event)
        {
            if(event == 10)
            {
                setViewsPerSlide_10_button('outline');
                setViewsPerSlide_20_button(null);
                setViewsPerSlide_50_button(null);
                setViewsPerSlide(event);
            }
            else if(event == 20)
            {
                setViewsPerSlide_10_button(null);
                setViewsPerSlide_20_button('outline');
                setViewsPerSlide_50_button(null);
                setViewsPerSlide(event);
            }
            else if(event == 50)
            {
                setViewsPerSlide_10_button(null);
                setViewsPerSlide_20_button(null);
                setViewsPerSlide_50_button('outline');
                setViewsPerSlide(event);
            }
        }

        return (
            <React.Fragment>

            <IonContent className='appContent'>
                <IonGrid>
                    <IonRow>
                        <IonCol size='3'>
                            <input placeholder= 'Search Name' ref={searchListRef_name} onChange={() => handleSearchList_name()}></input>
                        </IonCol>
                        <IonCol size='3'>
                            <input placeholder= 'Search Abilities' ref={searchListRef_abilities} onChange={() => handleSearchList_abilities()}></input>
                        </IonCol>
                        <IonCol size='6'> 
                            <select name="sortList" id='sortList' onChange={(e) => handleSortList(e) }>
                                <option value='name' >Name</option>
                                <option value='height'>Height</option>
                                <option value='weight'>Weight</option>
                            </select>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size= '12'>
                            <IonButton fill={viewsPerSlide_10_button} onClick={() => setViewsPerSlideHandler(10)}>10</IonButton>
                            <IonButton fill={viewsPerSlide_20_button} onClick={() => setViewsPerSlideHandler(20)}>20</IonButton>
                            <IonButton fill={viewsPerSlide_50_button} onClick={() => setViewsPerSlideHandler(50)}>50</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton className='apFooter_button_topLeft' onClick={() => nextSlide()}> Next </IonButton>
                            <IonButton className='apFooter_button_topRight' onClick={() => prevSlide()}> Back </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            {(searchListRef_name.current.value == '' && searchListRef_abilities.current.value == '') && 
            <IonSlides id='viewAllPokemonSlides' pager='true' options={{slidesPerView: viewsPerSlide}}>
                {viewAllPokemon.map((detailData) =>   {
                        return (
                                <IonSlide className='pokemon_showcase_slide'>
                                    <IonCard className='pokemon_showcase_card' style={{width: '100%', height: '100%'}}>
                                        <IonImg className='pokemon_showcase_main' src={detailData.image} style={{width: '50%', height: '70%'}}></IonImg>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>{detailData.name}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>Height: {detailData.height} / Weight: {detailData.weight}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>Abilities: {detailData.abilities}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonButton onClick={() => detailsModalHandler([true, detailData.url])}>Details</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>

                                    </IonCard>
                                </IonSlide>
                        );
                    })}

            </IonSlides>
            }
            {(searchListRef_name.current.value != '' || searchListRef_abilities.current.value != '') && 
            <IonSlides pager='true' options={{slidesPerView: viewsPerSlide}}>
                {viewAllPokemon_filtered.map((detailData) =>   {
                        return (
                                <IonSlide key={detailData.id}>
                                    <IonCard className='pokemon_showcase_card' style={{width: '50%', height: '70%'}}>
                                        <IonImg className='pokemon_showcase_main' src={detailData.image} style={{width: '50%', height: '70%'}}></IonImg>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>{detailData.name}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>Height: {detailData.height} / Weight: {detailData.weight}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonText>Abilities: {detailData.abilities}</IonText>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <IonCol size='12'>
                                                    <IonButton onClick={() => detailsModalHandler([true, detailData.url])}>Details</IonButton>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>

                                    </IonCard>
                                </IonSlide>
                        );
                    })}

            </IonSlides>
            }

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton className='apFooter_button_bottomLeft' onClick={() => nextSlide()}> Next </IonButton>
                        <IonButton className='apFooter_button_bottomRight' onClick={() => prevSlide()}> Back </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>

            {details_modal == true && <Pokemon_Details_Modal openModal={ details_modal } closeModal={() => setDetails_modal(false)} pokemonDetails={pokemonOverallDetails}></Pokemon_Details_Modal>}

            </React.Fragment>

        )

    }