import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import { useEffect, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  useElectionDispatch,
  useElectionsState,
} from "../../context/elections/context";

import { TrashIcon } from "@heroicons/react/24/outline";

import {
  useVotersDetailDispatch,
  useVotersDetailsState,
} from "../../context/voters/context";
import {
  addVoter,
  deleteVoter,
  fetchVoters,
} from "../../context/voters/actions";
import { fetchElectionDetail } from "../../context/electionData/action";
import { fetchElection } from "../../context/elections/actions";

type Inputs = {
  voterId: string;
  password: string;
};

const VotersDetail = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const electionState = useElectionsState();
  const electionDispatch = useElectionDispatch();
  let { electionID } = useParams();
  const { t } = useTranslation();

  debugger;

  const VoterDetailState: any = useVotersDetailsState();
  const { voters, isLoading, isError, errorMessage } = VoterDetailState;
  const voterDetailDispatch = useVotersDetailDispatch();

  useEffect(() => {
    if (electionID) {
      fetchElection(electionDispatch);
      fetchVoters(voterDetailDispatch, electionID);
    }
  }, [electionID, voterDetailDispatch]);

  const selectedElection = electionState?.elections.filter(
    (election: any) => `${election?.id}` === electionID
  )?.[0];

  if (isLoading) {
    return <>{t("loading")}</>;
  }

  if (!selectedElection) {
    return (
      <p className="font-semibold text-center text-red-500">
        {t("noSelectedElections")}
      </p>
    );
  }

  const deleteVoterHandler = async (id: number) => {
    console.log(id);
    const response = await deleteVoter(voterDetailDispatch, id);
    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { voterId, password } = data;
    const response = await addVoter(voterDetailDispatch, selectedElection?.id, {
      voterId,
      password,
    });
    debugger;
    if (response.ok) {
      setIsOpen(false);
    } else {
      setError(response.error as React.SetStateAction<null>);
    }
  };

  return (
    <>
      <div className="mx-auto mb-3">
        <Link
          to={`/account/election/${electionID}`}
          className="rounded text-white bg-black text-sm inline px-2 py-2"
        >
          {t("gotoBallotPage")}
        </Link>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl mt-3 text-green-700 font-medium tracking-tight  dark:text-zinc-50">
          {t("manageVoter")} : {selectedElection.title}
        </h2>
        <button
          id="newVoterBtn"
          onClick={openModal}
          className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {t("newVoterButtonText")}
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {t("NewVoterModalHeader")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <span className="text-red-500">{error}</span>}
                        <input
                          type="text"
                          id="voterID"
                          placeholder={t("newVoterIdPlaceHolder")}
                          autoFocus
                          {...register("voterId", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.voterId ? "border-red-500" : ""
                          }`}
                        />
                        {errors.voterId && (
                          <span className="text-red-500">
                            {t("requiredNote")}
                          </span>
                        )}
                        <input
                          type="password"
                          id="pwd"
                          placeholder={t("voterPasswordPlaceHolder")}
                          autoFocus
                          {...register("password", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        {errors.password && (
                          <span className="text-red-500">
                            {t("requiredNote")}
                          </span>
                        )}
                        <button
                          type="submit"
                          id="create-member-btn"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {t("submitButtonText")}
                        </button>
                        <button
                          type="submit"
                          onClick={closeModal}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          {t("cancelButtonText")}
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      {/* <div className="grid grid-cols-4 gap-2"> */}
      {voters.length ? (
        <div className="mt-5">
          <h3 className="text-xl font-bold my-3">{t("listHeaderVoter")}</h3>
          <div className="grid gap-4 grid-cols-4 mt-5">
            {voters.map((Voter: any) => (
              <div
                key={`${Voter.id}-${Voter.voterId}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between">
                  {/* <Link to={`${quetion.id}`}> */}
                  <div>
                    <h5 className="mb-2 text-lg font-medium tracking-tight text-slate-700 dark:text-white">
                      <span className="font-bold">{t("VoterId")} : </span>
                      {Voter.voterId}
                    </h5>
                  </div>
                  {/* </Link> */}
                  <button
                    onClick={() => {
                      deleteVoterHandler(Voter.id);
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
          </div>
          <div></div>
        </div>
      ) : (
        <p className="text-red-500">{t("noVoteradded")}</p>
      )}
      {/* </div> */}
    </>
  );
};

export default VotersDetail;
