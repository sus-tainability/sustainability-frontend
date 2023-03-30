import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";

import SingleSignOn from "@components/Authentication/SingleSignOn";

import useAsync from "@/hooks/useAsync";
import { useApi } from "@/api/ApiHandler";
import AuthService from "@/api/Authentication/AuthService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useApi(() => AuthService.login(email, password), true, true);
  const { execute, status, value } = useAsync(login, false);

  useEffect(() => {
    if (status === "success" && value?.isSuccess) {
      setTimeout(() => window.location.reload(), 1000);
    }
  }, [status, value]);

  return (
    <IonPage>
      <IonContent>
        <div className="flex bg-gradient-to-b from-[#652E20] to-[#332019] min-h-full flex-col justify-center sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-20 m-6 rounded-lg shadow p-7">
            <div className="sm:mx-auto mb-4 sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                Log in to EcoQuest
              </h2>
            </div>
            <form className="space-y-4" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={status === "pending"}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    execute();
                  }}
                  className="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-lg font-semibold text-black shadow-sm bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Log in
                </button>
              </div>
            </form>

            <SingleSignOn />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginForm;
