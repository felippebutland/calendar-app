import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

function fetchQuery() {
    return Promise.resolve({
        data: {
            calendar: {
                id: '1',
                name: 'My Calendar',
                events: [
                    {
                        id: 'event-1',
                        title: 'Meeting',
                        date: '2023-04-12T10:00:00.000Z',
                    },
                ],
            },
        },
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
