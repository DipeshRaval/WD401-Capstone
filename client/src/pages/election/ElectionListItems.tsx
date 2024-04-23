import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  useElectionDispatch,
  useElectionsState,
} from "../../context/elections/context";
import { useTranslation } from "react-i18next";
import { deleteElection } from "../../context/elections/actions";
import { Link } from "react-router-dom";

export default function ProjectListItems() {
  let state: any = useElectionsState();
  const { elections, isLoading, isError, errorMessage } = state;
  const { t } = useTranslation();

  const dispatchelections = useElectionDispatch();

  if (elections.length === 0 && isLoading) {
    return <span>{t("loading")}</span>;
  }

  // if (elections.length === 0) {
  //   // throw Error("Error!!! elections are not created Yet.");
  //   return <span>{t("Elections are not created Yet.")}</span>;
  // }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const deleteMemberHandler = async (id: number) => {
    console.log(id);
    const response = await deleteElection(dispatchelections, id);
    console.log(response);
  };

  return (
    <>
      {elections.map((election: any) => (
        <div
          key={`${election.id}-${election.title}`}
          className="block member p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between">
            <Link to={`${election.id}`}>
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                <span className="font-bold">{t("Title")} : </span>
                {election.title}
              </h5>
            </Link>
            <button
              onClick={() => {
                deleteMemberHandler(election.id);
              }}
            >
              <TrashIcon
                className="h-8 w-8 text-red-600 hover:bg-red-500 hover:text-white border-red-600 border-2 hover:border-red-700 p-1 rounded-md transition duration-1200"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
