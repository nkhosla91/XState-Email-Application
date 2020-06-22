import React from 'react';
import { useMachine } from '@xstate/react';
import xStateMachine from '../XState';
import { State } from './State'

export const AppContext = React.createContext<any>(null);

export const Home = () => {
    const [current, send] = useMachine(xStateMachine);

    return (
        <AppContext.Provider value={{ machine: { current, send } }}>
            <State matches={'IDLE'}>
                <button onClick={() => send('OPEN_EMAILS')}>Open</button>
            </State>
            <State current={current} matches={'LOADING_EMAILS'}>
                <div>Loading...</div>;

        </State>
            <State matches={'HOME_PAGE'}>
                <div>HOME</div>;
        </State>
            <State matches={'APPLICATION_ERROR'}>
                <div>ERROR</div>;
        </State>
        </AppContext.Provider>
    )
}


    // switch (current.value) {
    //     case 'IDLE':
    //         return (
    //             <button onClick={() => send('OPEN_EMAILS')}>Open</button>
    //         );
    //     case 'LOADING_EMAILS':
    //         return <div>Loading...</div>;
    //     case 'HOME_PAGE':
    //         return <div>HOME</div>;
    //     case 'APPLICATION_ERROR':
    //         return <div>ERROR</div>;
    //         ;
    // }
