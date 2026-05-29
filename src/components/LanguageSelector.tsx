import { useRouter } from "next/router";
import Link from "next/link";

const LanguageSelector = () => {
  const { locale, locales = [], asPath, pathname } = useRouter();
  
  // Logic to determine if we are on a Lifestyle page (where text is dark)
  // or a standard page (where text is likely white/light)
  const isLifestyle = pathname.startsWith("/lifestyle");
  const textColor = isLifestyle ? "text-[#1C1A17]" : "text-white";

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={asPath}
          locale={l}
          className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${textColor} ${
            locale === l ? "opacity-100" : "opacity-30"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSelector;