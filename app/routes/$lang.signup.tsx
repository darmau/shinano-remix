import {redirect, type LoaderFunctionArgs} from "@remix-run/cloudflare";

export const loader = ({params}: LoaderFunctionArgs) => {
  const lang = (params.lang as string) ?? "zh";
  return redirect(`/${lang}/login`);
};

export const action = loader;
