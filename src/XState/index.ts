import { Machine, assign } from "xstate";

type Context = {
  emails?: [];
};

const initialContext: Context = {
  emails: undefined,
};

interface Schema {
  states: {
    HOME_PAGE: {};
    LOADING_EMAILS: {};
    ENTERING_APPLICATION: {};
    INBOX: {};
    DRAFT_EMAIL: {};
    APPLICATION_ERROR: {};
  };
}

type Transitions = { type: "OPEN_EMAILS"} 

async function fetchEmails() {
  Promise.resolve()
}
function isDraftingEmail() {
  return false;
}

const xStateMachine = Machine<Context, Schema, Transitions>({
  id: "example",
  initial: "HOME_PAGE",
  context: initialContext,
  states: {
    HOME_PAGE: {
      on: { OPEN_EMAILS: "LOADING_EMAILS" },
    },
    LOADING_EMAILS: {
      invoke: {
        id: "fetchEmails",
        src: (context, event) => fetchEmails(),
        onDone: {
          actions: assign({ emails: (context, event) => event.data }),
          target: "ENTERING_APPLICATION",
        },
        onError: {
          target: "APPLICATION_ERROR",
        },
      },
    },
    ENTERING_APPLICATION: {
      id: "ENTERING_APPLICATION",
      always:[
        {
          target: "DRAFT_EMAIL",
          cond: isDraftingEmail,
        },
        { target: "INBOX" }
      ]
    },
    INBOX: {
      id: "INBOX",
    },
    DRAFT_EMAIL: {
      id: "DRAFT_EMAIL",
    },
    APPLICATION_ERROR: {
      after: {
        5000: `HOME_PAGE`,
      },
    },
  },
});

export default xStateMachine;
