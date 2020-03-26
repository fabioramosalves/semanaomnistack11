import React , { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg  from '../../assets/heroes.png';
import logoImg  from '../../assets/logo.svg';

export default function Logon(){

    const [id, setId] = useState('');
    const [authorized, setAuthorized] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        if(id !== ""){
            try{       
                const response = await api.post('sessions', { id });
                const { name } = response.data;

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', name);
    
                console.log(response.data.name);
    
                setAuthorized("");
    
                history.push('/profile');
    
            }catch(error){
                setAuthorized("Usuário não registrado");
            }
        }
        else{
            setAuthorized("Favor Informar um ID")
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
            <img src={logoImg} alt="Be the Hero"/>
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input
                 placeholder="Seu ID"
                 value={id}
                 onChange={e => setId(e.target.value)}
                 />
                <button className="button" type="submit">Entrar</button>
                <div className="textAlert">{authorized}</div>
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02141"/>
                    Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}