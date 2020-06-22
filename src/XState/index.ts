import { Machine, assign } from 'xstate'
import { wait } from '../utils/delay'


type Context = {
    emails?: []
}

const initialContext: Context = {
    emails: undefined
}

interface Schema {
    states: {
        'IDLE': {};
        'LOADING_EMAILS': {},
        'HOME_PAGE': {};
        'APPLICATION_ERROR': {};
    }
}

type Transitions = { type: 'OPEN_EMAILS' }


function fetchEmails() {
    return wait({ delay: 2000 })
}



// xStateMachine

const xStateMachine = Machine<Context, Schema, Transitions>(
    {
        id: 'example',
        initial: 'IDLE',
        context: initialContext,
        states: {
            'IDLE': {
                on: { 'OPEN_EMAILS': 'LOADING_EMAILS' }
            },
            'LOADING_EMAILS': {
                invoke: {
                    id: 'fetchEmails',
                    src: (context, event) => fetchEmails(),
                    onDone: {
                        actions: assign({ emails: (context, event) => event.data }),
                        target: 'HOME_PAGE'
                    },
                    onError: {
                        target: 'APPLICATION_ERROR'
                    }
                }
            },
            'HOME_PAGE': {
                id: 'HOME_PAGE'
            },
            'APPLICATION_ERROR': {
                after: {
                    5000: `IDLE`,
                },
            }
        }
    }
)

export default xStateMachine

