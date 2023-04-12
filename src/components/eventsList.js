import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../relay/Environment';

const EventsListQuery = graphql`
    query EventsListQuery($skip: Int, $take: Int) {
        events(skip: $skip, take: $take) {
            id
            title
            description
        }
    }
`;

const EventsList = ({ skip, take }) => {
    return (
        <QueryRenderer
            environment={environment}
            query={EventsListQuery}
            variables={{ skip, take }}
            render={({ error, props }) => {
                if (error) {
                    return <div>Error!</div>;
                }
                if (!props) {
                    return <div>Loading...</div>;
                }
                const { events } = props;
                return (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                            </li>
                        ))}
                    </ul>
                );
            }}
        />
    );
};

export default EventsList;
