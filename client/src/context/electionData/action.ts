import { API_ENDPOINT } from "../../config/constants";

export const fetchElectionDetail = async (dispatch: any, id: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ELECTIONS_DETAIL_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/election/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    debugger;
    const data = await response.json();
    debugger;
    dispatch({
      type: "FETCH_ELECTIONS_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching selected elction:", error);
    dispatch({
      type: "FETCH_ELECTIONS_DETAIL_FAILURE",
      payload: "Unable to load selected election",
    });
  }
};

export const addQuetion = async (
  dispatch: any,
  electionId: number,
  args: any
) => {
  try {
    debugger;
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(
      `${API_ENDPOINT}/election/${electionId}/addQuestion`,
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
      throw new Error("Failed to create election");
    }
    if (data.error) {
      return { ok: false, error: data.error };
    }

    dispatch({ type: "ADD_QUETION_SUCCESS", payload: data });

    // Next, I'll return a status called "ok", with value `true`
    // as everything went well.
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};

export const deleteQuetion = async (dispatch: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    debugger;
    const response = await fetch(`${API_ENDPOINT}/election/delque/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete quetion " + id);
    }
    const data = await response.json();
    debugger;
    if (data.error) {
      return { ok: false, error: data.error };
    }
    if (data.success) {
      dispatch({ type: "DELETE_QUETION_SUCCESS", payload: id });
      return { ok: true };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};
