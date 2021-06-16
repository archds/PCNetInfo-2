import {SubscriptionClient} from "graphql-subscriptions-client";

export function subOn(query, todo) {
    const GRAPHQL_ENDPOINT = 'ws://127.0.0.1:8000/api/'
    const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
        reconnect: true,
        lazy: true, // only connect when there is a query
        connectionCallback: error => {
            error && console.error(error)
        }
    });
    client.request({query})
    const subscription = client.request({query})
        // so lets actually do something with the response
        .subscribe({
            next ({data}) {
                if (data) {
                    todo(data)
                }
            }
        })
}