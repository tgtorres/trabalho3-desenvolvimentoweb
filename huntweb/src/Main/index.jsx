import React, {Component} from 'react';
import api from '../services/api';

import './styles.css';

import {Link} from 'react-router-dom';

export default class Main extends Component{
    state = {
        members:[],
        membersInfo: {},
        page: 1,
    }
    componentDidMount(){
        this.loadMembers();
    };

    loadMembers = async (page = 1) => {
        const response = await api.get('/members?page=${page}');

        const {docs, ... membersInfo} = response.data;

        this.setState({members: docs, membersInfo});
    }

    nextPage = () => {
        const{ page, membersInfo} = this.state;
        if (page === membersInfo.pages) return
        const pageNumber = page + 1;

        this.loadMembers(pageNumber);
    }

    prevPage = () => {
        const{ page, membersInfo} = this.state;
        if(page === 1) return
        const pageNumber = page - 1;

        this.loadMembers(pageNumber);
        this.setState({members: membersInfo, page});
    }

    render(){
        const {members, page, membersInfo} = this.state;

        return (
            <div className="member-list">
                {this.state.members.map(members => {
                    <article key={members._id}>
                        <strong>{members.name}</strong>
                        <Link to={'/members/${member._id}'}>Acessar</Link>
                    </article>
                })}

                <div className="actions">
                    <button disabled = {page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled = {page === membersInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    };
};