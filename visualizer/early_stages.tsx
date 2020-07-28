// type Transitions = { type: "OPEN_EMAILS" };

const xStateMachine = Machine({
  id: "example",
  initial: "HOME_PAGE",
  states: {
    HOME_PAGE: {
      id: "HOME_PAGE",
      on: { OPEN_EMAILS: "INBOX" },
    },
    INBOX: {
      id: "INBOX",
    },
    DRAFT_EMAIL: {
      id: "DRAFT_EMAIL",
    },
  },
});
