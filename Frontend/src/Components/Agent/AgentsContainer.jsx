import React from 'react';
import AgentCard from './AgentCard';
import Style from './AgentsContainer.module.css';

const AgentsContainer = ({ agents }) => {
    return (
        <div className={Style.mainContainer}>
            <p className={Style.head}> Our Agents : </p>
            <div className={Style.agentsContainer}>
                {agents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
        </div>

    );
};

export default AgentsContainer;
