import { Dialog, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, Fragment, useState } from "react";
// import { useTasksDispatch, useTasksState } from "../../context/task/context";
// import { refreshTasks } from "../../context/task/actions";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  useElectionsState,
  useElectionDispatch,
} from "../../context/elections/context";

import {
  addQuetion,
  deleteQuetion,
  fetchElectionDetail,
} from "../../context/electionData/action";
import {
  useElectionsDetailState,
  useElectionDetailDispatch,
} from "../../context/electionData/context";
import { TrashIcon } from "@heroicons/react/24/outline";

type Inputs = {
  title: string;
  desc: string;
};

const ElectionDetails = () => {
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
  const electionDetailState: any = useElectionsDetailState();
  const { electionDetail, isLoading, isError, errorMessage } =
    electionDetailState;
  const electionDetailDispatch = useElectionDetailDispatch();

  useEffect(() => {
    if (electionID) fetchElectionDetail(electionDetailDispatch, electionID);
  }, [electionID, electionDispatch, electionDetailDispatch]);

  const selectedElection = electionState?.elections.filter(
    (election) => `${election?.id}` === electionID
  )?.[0];

  if (isLoading) {
    return <>{t("loading")}</>;
  }

  if (!selectedElection) {
    return (
      <p className="font-semibold text-center text-red-500">
        There is not such a Election
      </p>
    );
  }

  const deleteQuetionHandler = async (id: number) => {
    console.log(id);
    const response = await deleteQuetion(electionDetailDispatch, id);
    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { title, desc } = data;
    const response = await addQuetion(
      electionDetailDispatch,
      selectedElection?.id,
      {
        title,
        desc,
      }
    );
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
          to="/account/election"
          className="rounded text-white bg-black text-sm inline px-2 py-2"
        >
          {" "}
          Go to List Of Election
        </Link>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl mt-3 text-green-700 font-medium tracking-tight  dark:text-zinc-50">
          Manage :{" "}
          <span className="font-semibold underline">
            {selectedElection?.title}
          </span>
        </h2>
        {/* <Link to={`tasks/new`}> */}
        <button
          id="newTaskBtn"
          onClick={openModal}
          className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {t("newQuetionButtonText")}
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
                      {t("NewQuetionModalHeader")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <span className="text-red-500">{error}</span>}
                        <input
                          type="text"
                          id="name"
                          placeholder={t("newQueTitlePlaceHolder")}
                          autoFocus
                          {...register("title", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.title ? "border-red-500" : ""
                          }`}
                        />
                        {errors.title && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                        <input
                          type="text"
                          id="url"
                          placeholder={t("newQueDescriptionPlaceHolder")}
                          autoFocus
                          {...register("desc", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.desc ? "border-red-500" : ""
                          }`}
                        />
                        {errors.desc && (
                          <span className="text-red-500">
                            This field is required
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
        {/* </Link> */}
      </div>

      {electionDetail?.election?.launch && (
        <div>
          <div className="mt-4">
            <p className="text-green-900 bg-green-200 font-bold text-center mt-3 text-md">
              Election is Launched ...
            </p>
          </div>
          <div className="mt-4 mb-3 text-center">
            <span className="font-bold">
              Here Your election is Live 👉👉👉 :{" "}
            </span>
            <Link
              to="/launch/<%= election?.url %>"
              target="_blank"
              className="text-blue-700"
            >
              {`https://online-voting-kcy6.onrender.com/${electionDetail?.election?.url}`}
            </Link>
          </div>
        </div>
      )}

      {electionDetail?.election?.end && (
        <div>
          <div className="mt-2">
            <p className="text-red-900 bg-red-200 font-bold text-center mt-3 text-md">
              Election is Ended ...
            </p>
          </div>
          <div className=" text-center mt-2 mb-3">
            <span className="font-bold">
              Here view result of election 👉👉👉 :{" "}
            </span>
            <Link
              to={`/launch/${electionDetail?.election?.url}`}
              target="_blank"
              className="text-blue-700"
            >
              {`https://online-voting-kcy6.onrender.com/${electionDetail?.election?.url}`}
            </Link>
          </div>
        </div>
      )}

      {/* <div className="grid grid-cols-4 gap-2"> */}
      <div className="mt-5">
        {/* <p className="my-2 text-xl">
          Your Election have a{" "}
          <span className="font-bold"> {electionDetail?.quetion?.length}</span>{" "}
          Quetions.
        </p> */}
        {/* <a
          href="/election/<%= election?.id %>/addquetion"
          className="text-blue-900 hover:text-red-600 underline"
        >
          Manage quetions
        </a> */}
        <h3 className="text-xl font-bold my-3">
          List Of Quetions For Election
        </h3>
        <div className="grid gap-4 grid-cols-3 mt-5">
          {electionDetail.quetion.map((quetion: any) => (
            <div
              key={`${quetion.id}-${quetion.title}`}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="flex justify-between">
                <div>
                  <Link to={`/account/quetion/${electionID}/${quetion.id}`}>
                    <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      <span className="font-bold">{t("Title")} : </span>
                      {quetion.title}
                    </h5>
                  </Link>
                  <p>
                    <span className="text-md font-bold">Description : </span>
                    {quetion.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteQuetionHandler(quetion.id);
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

      <div className="mt-6">
        <p className="my-2 text-xl">
          Your Election have a{" "}
          <span className="font-bold"> {electionDetail?.totalVoter}</span>{" "}
          Voters.
        </p>
        <Link
          to={`/account/voters/${selectedElection.id}`}
          className="text-blue-900 hover:text-red-600 underline"
        >
          Manage Voters
        </Link>
      </div>

      <div className="flex justify-between mt-6 mb-3">
        <a
          href="/election/<%=election?.id%>/launch"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold border-2 border-gray-700 px-2 py-1 rounded"
        >
          Launch Election
        </a>
        <a
          href="/election/<%=election?.id%>/end"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold border-2 border-gray-700 px-2 py-1 rounded"
        >
          End Election
        </a>
        <a
          href="/election/<%=election?.id%>/preview/result"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold border-2 border-gray-700 px-2 py-1 rounded"
        >
          Preview Result
        </a>
      </div>
      {/* </div> */}
    </>
  );
};

export default ElectionDetails;
