import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import ApiService from "@/api/ApiService";
import { setLocalStorageValue } from "@/utils/miscellaneous";
import { toasterAtom, ToasterType } from "@/utils/atoms/toaster";
import { useRecoilState } from "recoil";
import { useApi } from "@/api/ApiHandler";
import UserService from "@/api/User/UserService";
import { userAtom } from "@/utils/atoms/user";

const baseUrl = process.env.REACT_APP_API_URL;

const SingleSignOn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToaster] = useRecoilState(toasterAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setUser] = useRecoilState(userAtom);
  // const [getSelf] = useApi(() => UserService.getSelf(), false, false, false);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse: { code: any }) => {
      const response = await axios.post(baseUrl + "login/oauth2/google", {
        code: codeResponse.code,
      });
      if (!response || !response.data.accessToken) {
        setToaster({
          isShown: true,
          message: "Login Failed!",
          title: "Error",
          type: ToasterType.ERROR,
        });
      }

      // store the x-auth-token in localStorage
      const accessToken: string = response.data.accessToken;
      setLocalStorageValue(ApiService.authTokenKey, accessToken);
      setToaster({
        isShown: true,
        message: "Successfully Logged In",
        title: "Success",
        type: ToasterType.SUCCESS,
      });
      // const res = await getSelf();
      // if (res && res.data) {
      //   setUser((prev) => ({ ...prev, ...res.data }));
      // }
      // window.setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    },
  });

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3">
        <div>
          <a
            href="#"
            onClick={() => googleLogin()}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with Google</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleSignOn;
