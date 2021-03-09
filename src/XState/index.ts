import { Machine, MachineConfig, MachineOptions, assign } from "xstate";

type Context = {
  emails?: any;
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


const xStateConfig: MachineConfig<Context, Schema, Transitions> = {
  id: "example",
  initial: "HOME_PAGE",
  context: initialContext,
  states: {
    HOME_PAGE: {
      on: { OPEN_EMAILS: "LOADING_EMAILS" },
    },
    LOADING_EMAILS: {
      invoke: {
        id: "LOADING_EMAILS",
        src: "fetchEmails",
        onDone: {
          actions: "setEmails",
          target: "ENTERING_APPLICATION",
        },
        onError: {
          target: "APPLIATION_ERROR",
        },
      },
    },
    ENTERING_APPLICATION: {
      id: "ENTERING_APPLICATION",
      always: [
        {
          target: "DRAFT_EMAIL",
          cond: "isDraftingEmail",
        },
        { target: "INBOX" },
      ],
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
};

const xStateOptions: Partial<MachineOptions<Context, any>> = {
  services: {
    fetchEmails: async () => {
      return new Promise((resolve, reject) => {
        // resolve();
        reject();
      });
    },
  },
  actions: {
    setEmails: assign({ emails: (context, event) => event.data }),
  },
  guards: {
    isDraftingEmail: () => {
      return true;
      // return false;
    },
  },
};

const xStateMachine = Machine<Context, Schema, Transitions>(
  xStateConfig,
  xStateOptions
);

export default xStateMachine;
