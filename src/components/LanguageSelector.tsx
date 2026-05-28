// components/LanguageSelector.tsx
import { useRouter } from "next/router";
import Link from "next/link";

const LanguageSelector = () => {
  const { locales, locale, asPath } = useRouter();

  return (
    <div className="flex items-center gap-1.5 ml-2">
      {locales?.map((loc) => (
        <Link 
          key={loc} 
          href={asPath} 
          locale={loc}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-opacity ${
            locale === loc ? "opacity-100 text-[#3c9d49]" : "opacity-80 hover:opacity-70"
          }`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSelector;