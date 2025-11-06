import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export const loader = ({params}: LoaderFunctionArgs) => {
  const lang = (params.lang as string) ?? "zh";
  return redirect(`/${lang}/login`);
};

export const action = loader;
