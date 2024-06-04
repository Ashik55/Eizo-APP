"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updatePassword(prevState: any, formData: FormData) {
  const supabase = createRouteHandlerClient({ cookies });
  const confirmPassword = String(formData.get("confirmPassword"));
  const password = String(formData.get("password"));

  if (password !== confirmPassword) {
    return {
      error: "Passwords don't match",
    };
  }
  const { error, data } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      error: `${error.message}`,
    };
  }
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) {
    return {
      error: `${signOutError.message}`,
    };
  }
  return redirect(`${process.env.BASE_URL}/login`);
}
