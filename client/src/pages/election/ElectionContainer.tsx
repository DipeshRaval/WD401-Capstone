import React, { useEffect } from "react";
import { useElectionDispatch } from "../../context/elections/context";
import { fetchElection } from "../../context/elections/actions";
import { Outlet } from "react-router-dom";
// import { useMembersDispatch } from "../../context/members/context";
// import { fetchMembers } from "../../context/members/actions";

const ElectionContainer = () => {
  const electionDispatch = useElectionDispatch();
  // const memberDispatch = useMembersDispatch();
  useEffect(() => {
    fetchElection(electionDispatch);
    // fetchMembers(memberDispatch);
  }, [electionDispatch]);
  // }, [electionDispatch, memberDispatch]);
  return <Outlet />;
};

export default ElectionContainer;
