import { Link } from "react-router-dom";
import { EnterRequest } from "../interfaces/EnterRequest";
import { FormInfo } from "../interfaces/FormInfo";
import { BACKEND_URL } from "../constants";

export const registerOptions: EnterRequest & FormInfo = {
  actionTitle: "Create account",
  buttonText: "Sign up",
  textAction: (
    <>
      Already have an account? <Link to="/login">Sign in</Link>
    </>
  ),
  requestFunc: async (event, login, password) => {
    event.preventDefault();
    try {
      const response = await (
        await fetch(`${BACKEND_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        })
      ).json();

      alert(
        JSON.stringify({
          response,
        })
      );
    } catch (e: any) {
      console.log(e);
    }
  },
};

export const loginOptions: EnterRequest & FormInfo = {
  actionTitle: "Sign in",
  buttonText: "Sign in",
  requestFunc: async (event, login, password) => {
    event.preventDefault();

    try {
      const responseData = await await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      if (responseData.status !== 200) {
        alert(responseData.statusText);
        return;
      }

      const responseJson = await responseData.json();
      const { access_token } = responseJson;
      localStorage.setItem("access_token", access_token);
      alert("Good! Now go to dashboard!");
    } catch (e: any) {
      console.log(e);
    }
  },
};
