import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

import { Fragment, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
// import { useMembersDispatch } from "../../context/members/context";
// import { add } from "../../context/members/actions";
import { useElectionDispatch } from "../../context/elections/context";
import { addElection } from "../../context/elections/actions";

type Inputs = {
  electionTitle: string;
  electionUrl: string;
};

const NewElection = () => {
  const { t } = useTranslation();

  let [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);
  const dispatchMembers = useElectionDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { electionTitle, electionUrl } = data;
    const response = await addElection(dispatchMembers, {
      title: electionTitle,
      url: electionUrl,
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
      <button
        type="button"
        onClick={openModal}
        id="new-member-btn"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {t("NewElectionButtonText")}
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
                    {t("NewElectionModalHeader")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {error && <span className="text-red-500">{error}</span>}
                      <input
                        type="text"
                        id="name"
                        placeholder={t("NewElectionTitlePlaceHolder")}
                        autoFocus
                        {...register("electionTitle", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.electionTitle ? "border-red-500" : ""
                        }`}
                      />
                      {errors.electionTitle && (
                        <span className="text-red-500">
                          {t("requiredNote")}
                        </span>
                      )}
                      <input
                        type="text"
                        id="url"
                        placeholder={t("NewElectionPlacurleHolder")}
                        autoFocus
                        {...register("electionUrl", { required: true })}
                        className={`w-full border rounded-md py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
                          errors.electionUrl ? "border-red-500" : ""
                        }`}
                      />
                      {errors.electionUrl && (
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
    </>
  );
};
export default NewElection;
