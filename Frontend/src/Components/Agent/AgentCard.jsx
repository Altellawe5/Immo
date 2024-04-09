import React from 'react';
import Style from './AgentCard.module.css';

const AgentCard = ({ agent }) => {
    return (
        <div className={Style.card}>
            <img className={Style.agentImage} src={agent.image.url} alt="Agent" />
            <div className={Style.info}>
                <h2 className={Style.name}>{agent.firstName} {agent.lastName}</h2>
                <p className={Style.email}>{agent.email}</p>
                <p><span className={Style.label}>Age:</span> <span className={Style.value}>{agent.age}</span></p>
                <p><span className={Style.label}>Phone:</span> <span className={Style.value}>{agent.phoneNumber}</span></p>
                <p><span className={Style.label}>Experience:</span> <span className={Style.value}>{agent.experince} years</span></p>
            </div>
        </div>
    );
};

export default AgentCard;
