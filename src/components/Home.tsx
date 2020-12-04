import React from "react";
import { useMachine } from "@xstate/react";
import xStateMachine from "../XState";
import { State } from "./State";

export const AppContext = React.createContext<any>(null);

export const Home = () => {
  const [current, send] = useMachine(xStateMachine);

  // switch (current.value) {
  //   case "HOME_PAGE":
  //     return <button onClick={() => send("OPEN_EMAILS")}>Open</button>;
  //   case "LOADING_EMAILS":
  //     return <div>LOADING...</div>;
  //   case "ENTERING_APPLICATION":
  //     return <div>ENTERING...</div>;
  //   case "INBOX":
  //     return <div>INBOX</div>;
  //   case "DRAFT_EMAIL":
  //     return <div>DRAFT EMAIL...</div>;
  //   case "APPLICATION_ERROR":
  //     return <div>ERROR</div>;
  // }

  return (
    <AppContext.Provider value={{ machine: { current, send } }}>
      <State matches={"HOME_PAGE"}>
        <button onClick={() => send("OPEN_EMAILS")}>Open</button>
      </State>
      <State current={current} matches={"LOADING_EMAILS"}>
        <div>LOADING...</div>
      </State>
      <State current={current} matches={"ENTERING_APPLICATION"}>
        <div>ENTERING...</div>
      </State>
      <State matches={"INBOX"}>
        <div>INBOX</div>
      </State>
      <State current={current} matches={"DRAFT_EMAIL"}>
        <div>DRAFT EMAIL</div>
      </State>
      <State matches={"APPLICATION_ERROR"}>
        <div>APPLICATION ERROR</div>
      </State>
    </AppContext.Provider>
  );
};
