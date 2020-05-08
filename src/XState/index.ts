import { Machine, assign } from 'xstate'

type Context = {
    emails?: []
}

const initialContext = {
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

type Transitions = { type: 'OPEN' }


function fetchEmails() {
    return Promise.resolve()
}



// xStateMachine

const xStateMachine = Machine<Context, Schema, Transitions>(
    {
        id: 'example',
        initial: 'IDLE',
        context: initialContext,
        states: {
            'IDLE': {
                on: { 'OPEN': 'LOADING_EMAILS' }
            },
            'LOADING_EMAILS': {
                invoke: {
                    id: 'fetchEmails',
                    src: (context, event) => fetchEmails(),
                    onDone: {
                        target: 'HOME_PAGE',
                        actions: assign({ emails: (context, event) => event.data })
                    },
                    onError: {
                        target: 'APPLICATION_ERROR'
                    }
                }
            },
            'HOME_PAGE': {},
            'APPLICATION_ERROR': {
                after: {
                    5000: `IDLE`,
                },
            }
        }
    }
)

