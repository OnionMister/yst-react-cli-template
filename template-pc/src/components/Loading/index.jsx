import React from 'react';

export default function Loading({
    error, retry, timedOut, pastDelay,
}) {
    if (error) {
        console.log('error: ', error);
        return (
            <div>
                Error!
                <button onClick={retry}>Retry</button>
            </div>
        );
    } if (timedOut) {
        return (
            <div>
                Taking a long time...
                <button onClick={retry}>Retry</button>
            </div>
        );
    } if (pastDelay) {
        return <div>Loading...</div>;
    }
    return null;
}
