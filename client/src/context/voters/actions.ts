import { API_ENDPOINT } from "../../config/constants";

export const fetchVoters = async (dispatch: any, eid: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_VOTERS_DETAIL_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/voter/${eid}`, {
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
      type: "FETCH_VOTERS_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching voters for election:", error);
    dispatch({
      type: "FETCH_VOTERS_DETAIL_FAILURE",
      payload: "Unable to load voters for election",
    });
  }
};

export const addVoter = async (dispatch: any, eleId: number, args: any) => {
  try {
    debugger;
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/voter/${eleId}/addVoter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      // Next, I'll pass the `args` here
      body: JSON.stringify(args),
    });
    debugger;
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to create voter for election " + eleId);
    }
    if (data.error) {
      return { ok: false, error: data.error };
    }

    dispatch({ type: "ADD_VOTER_SUCCESS", payload: data });
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};

export const deleteVoter = async (dispatch: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    debugger;
    const response = await fetch(`${API_ENDPOINT}/voter/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete voter with id " + id);
    }
    const data = await response.json();
    debugger;
    if (data.error) {
      return { ok: false, error: data.error };
    }
    if (data.success) {
      dispatch({ type: "DELETE_VOTER_SUCCESS", payload: id });
      return { ok: true };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};
