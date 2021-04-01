const fetch = require('node-fetch');


exports.handler = async (event) => {
        console.log(event);
        const body = JSON.parse(event.body);
        const { name, email, subject, message } = body.payload.data
        
        const response = await fetch('https://graphql.fauna.com/graphql', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${process.env.FAUNA_API_SECRET}`,
            },
            body: JSON.stringify({
            query: `
                mutation($name: String!, $email: String!, $subject: String!, $message: String!) {
                createRegistration(data: { name: $name, email: $email, subject: $subject, message: $message }) {
                    _id
                }
                }      
            `,
            variables: {
                name,
                email,
                subject,
                message
            },
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.error(err));

    console.log(response);
        
        return {
            statusCode: 200,
            body: 'Hayo! That worked...',
        };
    };