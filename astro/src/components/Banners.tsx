import { useEffect, useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { getBannerCopy } from "../../../app/locales/banner";

const STORAGE_KEY = "firewood.community-banner.dismissed";

export default function Banners({ lang }: { lang: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) setIsVisible(true);
  }, []);

  const localizedCopy = useMemo(() => getBannerCopy(lang), [lang]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="z-50 pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
        <div className="flex-1 text-white">
          <p className="text-sm/6 text-gray-100">{localizedCopy.body}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            onClick={handleDismiss}
            className="-m-1.5 flex-none rounded p-1.5 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
