import React, {Component} from 'react';
import api from '../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Redirect} from 'react-router'

import './styless.css';

export default class Member extends Component{
    state = {
        redirect: false,
        member: {},
        memberTemp: {name: '', email: '', cpf: '', address: '', birth: '', phone: '', profession: ''}
    };

    async componentDidMount(){
        const {id} = this.props.match.params;
        const response = await api.get('/members/${id}');
        this.setState({member: response.data});
    };

    remove(member){
        this.setState({redirect: true});
        api.delete('members/${member._id}').catch((error) => 
            alert("Falha ao tentar excluir! Erro: " + error));
        this.clearMember();
    };

    seve(){
        this.setState({redirect: true});
        const member = {... this.state.memberTemp};
        api.post('/members/', {
            name: member.name,
            email: member.email,
            cpf: member.cpf,
            address: member.address,
            birth: member.birth,
            phone: member.phone,
            profession: member.profession
        }).catch((error) => alert("Falha na tentativa de cadastro! Erro: " + error));
        this.clear();
    };

    updateMember(){
        const member = {... this.state.memberTemp};
        api.put('/member/${member._id}', {
            name: member.name,
            email: member.email,
            cpf: member.cpf,
            address: member.address,
            birth: member.birth,
            phone: member.phone,
            profession: member.profession
        }).catch((error) => alert("Falha na tentaiva de atualização!" + error));
        this.clear();
        this.loadMember();
    };

    loadMember(){
        this.setState({member: {...this.state.memberTemp}});
    };

    loadTemp(){
        this.setState({memberTemp: {...this.state.member}});
    };

    clear(){
        this.setState({memberTemp: {name: '', email: '', cpf: '', address: '', birth: '', phone: '', profession: ''}});
    };

    clearMember(){
        this.setState({member: {name: '', email: '', cpf: '', address: '', birth: '', phone: '', profession: ''}});
    };

    handleChange(event){
        const memberTemp = {... this.state.memberTemp};
        memberTemp[event.target.name] = event.target.value;
        this.setState({memberTemp});
    };

    render(){
        const {member} = this.state;
        const {memberTemp} = this.state;

        if(this.state.redirect){
            return <Redirect to="/" />
        }else{
            return(
                <div>
                    <div className="member-info">
                        <h1>{member.name}</h1>
                        <p>{member.email}</p>
                        <p>{member.cpf}</p>
                        <p>{member.address}</p>
                        <p>{member.birth}</p>
                        <p>{member.phone}</p>
                        <p>{member.profession}</p>
    
                        <button className="btn btn-warning" onClick={() => this.loadTemp}>
                            <i className="fa fa-pencil"></i>
                        </button>
    
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(member)}>
                            <i className="fa fa-trash"></i>
                        </button>
    
                    </div>
    
                    <form className="member-form">
                        <div className="fields">
                            <div className="form-group">
                                <label>Nome: </label>
                                <input type="text" name="name" value={memberTemp.name}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Email: </label>
                                <input type="text" name="email" value={memberTemp.email}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Cpf: </label>
                                <input type="text" name="cpf" value={memberTemp.cpf}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Endereço: </label>
                                <input type="text" name="address" value={memberTemp.address}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Data de nascimento: </label>
                                <input type="text" name="birth" value={memberTemp.birth}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Telefone: </label>
                                <input type="text" name="phone" value={memberTemp.phone}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label>Profissão: </label>
                                <input type="text" name="profession" value={memberTemp.profession}
                                className="form-control" onChange={e => this.handleChange(e)}/>
                            </div>
    
                            <div className="row-buttons">
                                <input className="btn-btn-primary" type="button"
                                value="Atualizar" onClick={e => this.updateMember(member.id, member)}/>
                                
                                <input className="btn-btn-sucess ml-2" type="button"
                                value="Novo" onClick={e => this.save(e)}/>
                                
                                <input className="btn-btn-secondary ml-2" type="button"
                                value="Cancelar" onClick={e => this.clear(e)}/>
                            </div>
    
                        </div>
                    </form>
                </div>
        }
        );
    };
};