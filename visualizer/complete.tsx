// type Transitions = { type: "OPEN_EMAILS" };

function isDraftingEmail() {
  return false;
}

const xStateMachine = Machine({
  id: "example",
  initial: "HOME_PAGE",
  states: {
    HOME_PAGE: {
      id: "HOME_PAGE",
      on: { OPEN_EMAILS: "LOADING_EMAILS" },
    },
    LOADING_EMAILS: {
      invoke: {
        id: "fetchEmails",
        src: (context, event) => fetchEmails(),
        onDone: {
          // actions: assign({ emails: (context, event) => event.data }),
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
          { target: "INBOX" },
        ],
      },
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
