import { Machine, assign } from "xstate";

type Context = {
  emails?: [];
};

const initialContext: Context = {
  emails: undefined,
};

interface Schema {
  states: {
    IDLE: {};
    LOADING_EMAILS: {};
    ENTERING_APPLICATION: {};
    HOME_PAGE: {};
    DRAFT_EMAIL: {};
    APPLICATION_ERROR: {};
  };
}

type Transitions = { type: "OPEN_EMAILS" };

async function fetchEmails() {
  Promise.resolve();
}
function isDraftingEmail() {
  return false;
}
// xStateMachine

const xStateMachine = Machine<Context, Schema, Transitions>({
  id: "example",
  initial: "IDLE",
  context: initialContext,
  states: {
    IDLE: {
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
      on: {
        "": [
          {
            target: "DRAFT_EMAIL",
            cond: isDraftingEmail,
          },
          { target: "HOME_PAGE" },
        ],
      },
    },
    HOME_PAGE: {
      id: "HOME_PAGE",
    },
    DRAFT_EMAIL: {
      id: "DRAFT_EMAIL",
    },
    APPLICATION_ERROR: {
      after: {
        5000: `IDLE`,
      },
    },
  },
});

export default xStateMachine;
