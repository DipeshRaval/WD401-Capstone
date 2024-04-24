import { Dialog, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, Fragment, useState } from "react";
// import { useTasksDispatch, useTasksState } from "../../context/task/context";
// import { refreshTasks } from "../../context/task/actions";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";

// import {
//   useElectionsState,
//   useElectionDispatch,
// } from "../../context/elections/context";

import {
  useElectionsDetailState,
  useElectionDetailDispatch,
} from "../../context/electionData/context";

import { TrashIcon } from "@heroicons/react/24/outline";
import {
  addOption,
  deleteOption,
  fetchOptionDetail,
} from "../../context/option/action";
import {
  useOptionsDetailDispatch,
  useOptionsDetailsState,
} from "../../context/option/context";
import { fetchElectionDetail } from "../../context/electionData/action";

type Inputs = {
  optionName: string;
};

const OptionsDetail = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //   const electionState = useElectionsState();
  //   const electionDispatch = useElectionDispatch();

  let { electionID, quetionID } = useParams();
  const { t } = useTranslation();

  debugger;
  const electionDetailState: any = useElectionsDetailState();
  const { electionDetail } = electionDetailState;
  const electionDetailDispatch = useElectionDetailDispatch();

  const optionDetailState: any = useOptionsDetailsState();
  const { optionsDetails, isLoading, isError, errorMessage } =
    optionDetailState;
  const optionDetailDispatch = useOptionsDetailDispatch();

  useEffect(() => {
    if (electionID) fetchElectionDetail(electionDetailDispatch, electionID);
    if (quetionID) fetchOptionDetail(optionDetailDispatch, quetionID);
  }, [quetionID, optionDetailDispatch, electionID, electionDetailDispatch]);

  const selectedQuetion = electionDetail?.quetion.filter(
    (quetion: any) => `${quetion?.id}` === quetionID
  )?.[0];

  if (isLoading) {
    return <>{t("loading")}</>;
  }

  if (!selectedQuetion) {
    return (
      <p className="font-semibold text-center text-red-500">
        {t("noSelectedQue")}
      </p>
    );
  }

  const deleteOptionHandler = async (id: number) => {
    console.log(id);
    const response = await deleteOption(optionDetailDispatch, id);
    console.log(response);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { optionName } = data;
    const response = await addOption(
      optionDetailDispatch,
      selectedQuetion?.id,
      {
        name: optionName,
        qid: selectedQuetion?.id,
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
          to={`/account/election/${electionID}`}
          className="rounded text-white bg-black text-sm inline px-2 py-2"
        >
          {t("gotoBallotPage")}
        </Link>
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl mt-3 text-green-700 font-medium tracking-tight  dark:text-zinc-50">
          {t("manageQuetion")}
        </h2>
        <button
          id="newTaskBtn"
          onClick={openModal}
          className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {t("newOptionButtonText")}
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
                          {...register("optionName", { required: true })}
                          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                            errors.optionName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.optionName && (
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

      <div>
        <h3 className="text-xl mt-3">
          <span className="text-blue-700 font-sans font-bold">
            {t("quetionTitleLable")}
          </span>
          {selectedQuetion.title}
        </h3>

        <p className="my-3 text-lg">
          <span className="text-blue-700 font-sans font-bold text-md">
            {t("quetionDescLable")}
          </span>
          {selectedQuetion.description}
        </p>
      </div>

      {/* <div className="grid grid-cols-4 gap-2"> */}
      {optionsDetails.options.length ? (
        <div className="mt-5">
          <h3 className="text-xl font-bold my-3">{t("listHeaderOption")}</h3>
          <div className="grid gap-4 grid-cols-4 mt-5">
            {optionsDetails.options.map((option: any) => (
              <div
                key={`${option.id}-${option.optionName}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between">
                  {/* <Link to={`${quetion.id}`}> */}
                  <div>
                    <h5 className="mb-2 text-lg font-medium tracking-tight text-slate-700 dark:text-white">
                      <span className="font-bold">{t("optionName")} : </span>
                      {option.optionName}
                    </h5>
                  </div>
                  {/* </Link> */}
                  <button
                    onClick={() => {
                      deleteOptionHandler(option.id);
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
        <p className="text-red-500">{t("noOptionadded")}</p>
      )}
      {/* </div> */}
    </>
  );
};

export default OptionsDetail;
