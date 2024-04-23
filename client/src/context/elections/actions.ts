import { API_ENDPOINT } from "../../config/constants";

export const fetchElection = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ELECTIONS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/election/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    debugger;
    const data = await response.json();
    dispatch({ type: "FETCH_ELECTIONS_SUCCESS", payload: data.election });
  } catch (error) {
    console.log("Error fetching elction:", error);
    dispatch({
      type: "FETCH_ELECTIONS_FAILURE",
      payload: "Unable to load election",
    });
  }
};

export const addElection = async (dispatch: any, args: any) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/election`, {
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
      throw new Error("Failed to create election");
    }
    if (data.error) {
      return { ok: false, error: data.error };
    }

    dispatch({ type: "ADD_ELECTION_SUCCESS", payload: data.election });

    // Next, I'll return a status called "ok", with value `true`
    // as everything went well.
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};

export const deleteElection = async (dispatch: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/election/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete member");
    }
    const data = await response.json();
    debugger;
    if (data.error) {
      return { ok: false, error: data.error };
    }
    dispatch({ type: "DELETE_ELECTION_SUCCESS", payload: id });
    return { ok: true };
  } catch (error) {
    console.error("Operation failed:", error);
    return { ok: false, error };
  }
};
