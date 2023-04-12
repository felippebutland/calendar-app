import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../relay/Environment';

const EventCalendarQuery = graphql`
    query EventCalendarQuery($id: String!) {
        eventCalendar(id: $id) {
            id
            title
            description
            creationDate
            ingredients
        }
    }
`;

const EventCalendar = ({ id }) => {
    return (
        <QueryRenderer
            environment={environment}
            query={EventCalendarQuery}
            variables={{ id }}
            render={({ error, props }) => {
                if (error) {
                    return <div>Error!</div>;
                }
                if (!props) {
                    return <div>Loading...</div>;
                }
                const { eventCalendar } = props;
                return (
                    <div>
                        <h2>{eventCalendar.title}</h2>
                        <p>{eventCalendar.description}</p>
                        <p>Creation Date: {eventCalendar.creationDate}</p>
                        <ul>
                            {eventCalendar.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                );
            }}
        />
    );
};

export default EventCalendar;
