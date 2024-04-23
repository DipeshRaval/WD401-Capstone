import React, { useEffect } from "react";
import ElectionListItems from "./ElectionListItems";
// import { useElectionDispatch } from "../../context/elections/context";
// import { fetchElection } from "../../context/elections/actions";

const ElectionList: React.FC = () => {
  //   const dispatchElection = useElectionDispatch();
  //
  //   useEffect(() => {
  //     fetchElection(dispatchElection);
  //   }, [dispatchElection]);

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <ElectionListItems />
    </div>
  );
};
export default ElectionList;
