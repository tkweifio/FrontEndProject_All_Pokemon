import React, { useEffect, useState, useRef } from 'react';
import { IonItem, IonButton, IonSlides, IonGrid, IonTabs, IonTab, IonTabBar, IonTabButton, IonToolbar, IonTitle, IonContent, IonHeader, IonLabel, IonRouterOutlet, IonFooter, IonCard, IonText, IonIcon, IonInput } from '@ionic/react';
import { IonSlide, IonRow, IonCol, IonImg } from '@ionic/react';

import '../css/pokemonApp.css';
import { Storage } from '@capacitor/storage'

import {Pokemon_Details_Modal } from './Pokemon_Details_revised';

async function removeStorageItems() {


    await Storage.remove({ key: 'sortedData' });
    await Storage.remove({ key: 'sortedData_filtered' });
    await Storage.remove({ key: 'searchData__name_value' });
    await Storage.remove({ key: 'searchData__name_filteredList' });
    await Storage.remove({ key: 'searchData_abilities_value' });
    await Storage.remove({ key: 'searchData_abilities_filteredList' });
}

async function getStorageItems() {

    //alert('In getStorageCredentials Merchant');
 
     const  stored_storedData  = await Storage.get({ key: 'sortedData' });
     const  stored_sortedData_filtered  = await Storage.get({ key: 'sortedData_filtered' });
     const  stored_searchData__name_value  = await Storage.get({ key: 'searchData__name_value' });
     const  stored_searchData__name_filteredList  = await Storage.get({ key: 'searchData__name_filteredList' });
     const  stored_searchData_abilities_value  = await Storage.get({ key: 'searchData_abilities_value' });
     const  stored_searchData_abilities_filteredList  = await Storage.get({ key: 'searchData_abilities_filteredList' });

    let storageObjects = {
        storedData: JSON.parse(stored_storedData.value),
        storedData_filtered: JSON.parse(stored_sortedData_filtered.value),
        searchData_name_value: stored_searchData__name_value.value,
        searchData_name_filteredList: JSON.parse(stored_searchData__name_filteredList.value),
        searchData_abilities_value: stored_searchData_abilities_value.value,
        searchData_abilities_filteredList: JSON.parse(stored_searchData_abilities_filteredList.value),

    }
 
    return storageObjects;
 
 }

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
    
            //removeStorageItems();

            getStorageItems().then(res => { 


                if(res.storedData != null)
                {
                    setAllPokemon(res.storedData);
                }
                if(res.storedData_filtered != null)
                {
                    setAllPokemon_filtered(res.storedData_filtered);
                }
                if(res.searchData_name_value != null)
                {

                    searchListRef_name.current.value = res.searchData_name_value;

                    for (let rownum = 0; rownum <= res.searchData_name_filteredList.length - 1; ++rownum)
                    {
        
                        setAllPokemon_filtered((prevAllPokemon_filtered) => {
                            return prevAllPokemon_filtered.concat({
                                id: rownum,
                                name: res.searchData_name_filteredList[rownum].name,
                                url: res.searchData_name_filteredList[rownum].url,
                                image: res.searchData_name_filteredList[rownum].image,
                                height:res.searchData_name_filteredList[rownum].height,
                                weight: res.searchData_name_filteredList[rownum].weight,
                                abilities: res.searchData_name_filteredList[rownum].abilities,
        
                            })
                        });
                    }

                }
                if(res.searchData_abilities_value != null)
                {
                    searchListRef_abilities.current.value = res.searchData_abilities_value;
                    for (let rownum = 0; rownum <= res.searchData_abilities_filteredList.length - 1; ++rownum)
                    {
        
                        setAllPokemon_filtered((prevAllPokemon_filtered) => {
                            return prevAllPokemon_filtered.concat({
                                id: rownum,
                                name: res.searchData_abilities_filteredList[rownum].name,
                                url: res.searchData_abilities_filteredList[rownum].url,
                                image: res.searchData_abilities_filteredList[rownum].image,
                                height:res.searchData_abilities_filteredList[rownum].height,
                                weight: res.searchData_abilities_filteredList[rownum].weight,
                                abilities: res.searchData_abilities_filteredList[rownum].abilities,
        
                            })
                        });
                    }
                }
    
            });
    
        }, [])



        useEffect(() => {

                fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0')
                .then(res => res.json())
                .then(res => {
            
                    //alert(res.results);
                    //alert(res.results.length);

                    for (let rownum = 0; rownum < 400; ++rownum)
                    {

                        fetch(Object.entries(res.results[rownum])[1][1])
                        .then(res2 => res2.json())
                        .then(res2 => {

                                let listOfAbilities = [];

                                for(let row2 = 0; row2 < Object.entries(res2.abilities).length; ++row2)
                                {
                                    listOfAbilities.push(Object.entries(res2.abilities[row2].ability)[0][1]);

                                    //alert(listOfAbilities[row2]);

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
                    } 
                })
        }, []);

        function handleSortList(e)
        {

            if(searchListRef_name.current.value == '' && searchListRef_abilities.current.value == '')
            {
                if(e.target.value == 'name')
                {
                    const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                        
                            return a.name > b.name ? 1 : -1
                        });
    
                    setAllPokemon(sortedData);

                    Storage.set({
                        key: 'sortedData',
                        value: JSON.stringify(viewAllPokemon),
                    })
                }
                if(e.target.value == 'height')
                {
                    const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                        return a.height > b.height ? 1 : -1
                    });
    
                    setAllPokemon(sortedData);

                    Storage.set({
                        key: 'sortedData',
                        value: JSON.stringify(viewAllPokemon),
                    })
                }
                if(e.target.value == 'weight')
                {
                    const sortedData = () => [...viewAllPokemon].sort((a, b) => {
                        return a.weight > b.weight ? 1 : -1
                    });
    
                    setAllPokemon(sortedData);

                    Storage.set({
                        key: 'sortedData',
                        value: JSON.stringify(viewAllPokemon),
                    })
                }
            }
            else if(searchListRef_name.current.value != '' || searchListRef_abilities.current.value != '')
            {

                if(e.target.value == 'name')
                {
                    const sortedData = () => [...viewAllPokemon_filtered].sort((a, b) => {
                        
                            return a.name > b.name ? 1 : -1
                        });
    
                        setAllPokemon_filtered(sortedData);


                        Storage.set({
                            key: 'sortedData_filtered',
                            value: JSON.stringify(viewAllPokemon_filtered),
                        })
                }
                if(e.target.value == 'height')
                {
                    const sortedData = () => [...viewAllPokemon_filtered].sort((a, b) => {
                        return a.height > b.height ? 1 : -1
                    });
    
                    setAllPokemon_filtered(sortedData);

                    Storage.set({
                        key: 'sortedData_filtered',
                        value: JSON.stringify(viewAllPokemon_filtered),
                    })
    
                }
                if(e.target.value == 'weight')
                {
                    const sortedData = () => [...viewAllPokemon_filtered].sort((a, b) => {
                        return a.weight > b.weight ? 1 : -1
                    });
    
                    setAllPokemon_filtered(sortedData);

                    Storage.set({
                        key: 'sortedData_filtered',
                        value: JSON.stringify(viewAllPokemon_filtered),
                    })
                }
            }
        }

        function handleSearchList_name()
        {

            if(searchListRef_name.current.value == '')
            {
                setAllPokemon_filtered([]);
            }
            else
            {
                const filtered = viewAllPokemon.filter(entry => Object.values(entry.name).some(val => typeof val === "string" && val.includes(searchListRef_name.current.value)));
    
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
                Storage.set({
                    key: 'searchData__name_value',
                    value: searchListRef_name.current.value,
                })


                Storage.set({
                    key: 'searchData__name_filteredList',
                    value: JSON.stringify(filtered),
                })
            }
        }

        function handleSearchList_abilities()
        {

            if(searchListRef_abilities.current.value == '')
            {
                setAllPokemon_filtered([]);
            }
            else
            {
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

                Storage.set({
                    key: 'searchData_abilities_value',
                    value: searchListRef_abilities.current.value,
                })

                Storage.set({
                    key: 'searchData_abilities_filteredList',
                    value: JSON.stringify(filtered),
                })
            }
        }

        function nextSlide(event)
        {
            //const swiper = mySlides.current.getSwiper();
            document.getElementById(event).slideNext();

        }
        function prevSlide(event)
        {
            //const swiper = mySlides.current.getSwiper();
            document.getElementById(event).slidePrev();

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
                        <IonCol>
                            <IonButton onClick={() => removeStorageItems()}>Clear Storage</IonButton>
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
                    {(searchListRef_name.current.value == '' && searchListRef_abilities.current.value == '') &&
                        <IonCol>
                            <IonButton className='apFooter_button_topLeft' onClick={() => nextSlide('viewAllPokemonSlides')}> Next </IonButton>
                            <IonButton className='apFooter_button_topRight' onClick={() => prevSlide('viewAllPokemonSlides')}> Back </IonButton>
                        </IonCol>
                    }
                    {(searchListRef_name.current.value != '' || searchListRef_abilities.current.value != '') &&
                        <IonCol>
                            <IonButton className='apFooter_button_topLeft' onClick={() => nextSlide('viewAllPokemonSlides_filtered')}> Next </IonButton>
                            <IonButton className='apFooter_button_topRight' onClick={() => prevSlide('viewAllPokemonSlides_filtered')}> Back </IonButton>
                        </IonCol>
                    }
                    </IonRow>
                </IonGrid>
            {(searchListRef_name.current.value == '' && searchListRef_abilities.current.value == '') && 
            <IonSlides id='viewAllPokemonSlides' pager='true' options={{slidesPerView: viewsPerSlide}}>
                {viewAllPokemon.map((detailData) =>   {
                        return (
                                <IonSlide >
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
            <IonSlides id='viewAllPokemonSlides_filtered' pager='true' options={{slidesPerView: viewsPerSlide}}>
                {viewAllPokemon_filtered.map((detailData) =>   {
                        return (
                                <IonSlide >
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
                {(searchListRef_name.current.value == '' && searchListRef_abilities.current.value == '') &&
                    <IonCol>
                        <IonButton className='apFooter_button_bottomLeft' onClick={() => nextSlide('viewAllPokemonSlides')}> Next </IonButton>
                        <IonButton className='apFooter_button_bottomRight' onClick={() => prevSlide('viewAllPokemonSlides')}> Back </IonButton>
                    </IonCol> 
                }
                {(searchListRef_name.current.value != '' || searchListRef_abilities.current.value != '') &&
                    <IonCol>
                        <IonButton className='apFooter_button_bottomLeft' onClick={() => nextSlide('viewAllPokemonSlides_filtered')}> Next </IonButton>
                        <IonButton className='apFooter_button_bottomRight' onClick={() => prevSlide('viewAllPokemonSlides_filtered')}> Back </IonButton>
                    </IonCol> 
                }
                </IonRow>
               
            </IonGrid>
            </IonContent>

            {details_modal == true && <Pokemon_Details_Modal openModal={ details_modal } closeModal={() => setDetails_modal(false)} pokemonDetails={pokemonOverallDetails}></Pokemon_Details_Modal>}

            </React.Fragment>

        )

    }