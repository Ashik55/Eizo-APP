"use client";

// @ts-ignore
import { useFormState } from "react-dom";
import Messages from "./messages";
import { IoEyeOff } from "react-icons/io5";
import { updatePassword } from "./action";
import { IoEye } from "react-icons/io5";
import React from "react";

export const dynamic = "force-dynamic";

const signInState = {
  password: "",
  confirmPassword: "",
};

export default function UpdatePassword() {
  const [state, formAction] = useFormState(updatePassword, signInState);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex min-h-[calc(100dvh-178px)] w-full flex-1 flex-col items-center justify-center bg-white md:min-h-[calc(100dvh-149px)] md:py-24">
      <div className="mx-auto flex max-w-7xl grid-cols-5 flex-col-reverse md:grid md:px-4 md:py-12">
        <div className="col-span-3 flex items-center px-5 md:mr-5">
          <img
            src="https://storage.googleapis.com/snapwiz.io/static/login_screen1_tgakzu.png"
            alt=""
            className=" rounded-2xl"
          />
        </div>
        <div className="col-span-2 flex w-full flex-1 flex-col justify-center gap-2">
          <form
            action={(e) => {
              formAction(e);
            }}
            className="grid"
          >
            <div>
              <input
                type={isVisible ? "text" : "password"}
                className="w-full rounded-md border bg-inherit px-4 py-2"
                name="password"
                placeholder="12345678"
                required
              />
              <button
                className="absolute right-3 top-3 focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
            <>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  className="w-full rounded-md border bg-inherit px-4 py-2"
                  name="confirmPassword"
                  placeholder="12345678"
                  required
                />
                <button
                  className="absolute right-3 top-3 focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </>
            <Messages error={state.error} message={state.message} />
          </form>
        </div>
      </div>
    </div>
  );
}
