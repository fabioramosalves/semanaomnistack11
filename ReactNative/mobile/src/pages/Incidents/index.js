import React, {useEffect, useState } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import logoImg from '../../../assets/logo.png';

import api from '../../services/api';

import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [totalItems, setTotalItens] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(totalItems > 0 && incidents.length === totalItems){
            return;
        }
        
        setLoading(true);
        const response = await api.get('incidents',{
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotalItens(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    },[]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold} >{totalItems} Casos</Text>.                        
                </Text>      
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList 
                keyExtractor={incident=> String(incident.id) }
                showsVerticalScrollIndicator = {false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                style={styles.incidentsList}
                data={incidents}
                renderItem={ ({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{ 
                        Intl.NumberFormat('pt-BR', 
                        {style: 'currency',
                        currency: 'BRL'
                        }).format( incident.value)}</Text>

                        <TouchableOpacity 
                        style={styles.detalsButton} 
                        onPress={()=> navigateToDetail(incident)}
                        >
                        <Text  style={styles.detailsButtonText}>Ver mais Detalhes</Text>
                        <Feather  name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    )
}