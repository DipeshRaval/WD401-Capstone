import { API_ENDPOINT } from "../../config/constants";

export const fetchOptionDetail = async (dispatch: any, id: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_OPTIONS_DETAIL_REQUEST" });
    const response = await fetch(
      `${API_ENDPOINT}/election/question/${id}/addOptions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    debugger;
    const data = await response.json();
    debugger;
    dispatch({
      type: "FETCH_OPTIONS_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching selected quetion Option:", error);
    dispatch({
      type: "FETCH_OPTIONS_DETAIL_FAILURE",
      payload: "Unable to load selected Quetion Option",
    });
  }
};

export const addOption = async (dispatch: any, queid: number, args: any) => {
  try {
    debugger;
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(
      `${API_ENDPOINT}/election/question/${queid}/addOptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        // Next, I'll pass the `args` here
        body: JSON.stringify(args),
      }
    );
    debugger;
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to create option for quetion " + queid);
    }
    if (data.error) {
      return { ok: false, error: data.error };
    }

    dispatch({ type: "ADD_OPTION_SUCCESS", payload: data });

    // Next, I'll return a status called "ok", with value `true`
    // as everything went well.
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};

export const deleteOption = async (dispatch: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    debugger;
    const response = await fetch(`${API_ENDPOINT}/election/option/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete option " + id);
    }
    const data = await response.json();
    debugger;
    if (data.error) {
      return { ok: false, error: data.error };
    }
    if (data.success) {
      dispatch({ type: "DELETE_OPTION_SUCCESS", payload: id });
      return { ok: true };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};
