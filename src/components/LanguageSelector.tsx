import { useRouter } from "next/router";
import Link from "next/link";

interface LanguageSelectorProps {
  post?: any; // The ? makes this prop optional
}

const LanguageSelector = ({ post }: LanguageSelectorProps) => {
  const { locale, locales = [], pathname } = useRouter();
  
  const isLifestyle = pathname.startsWith("/lifestyle");

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={post?.sibling?.slug ? `/lifestyle/${post.sibling.slug}` : `/lifestyle`}
          locale={l}
          className={`text-[10px] font-black uppercase tracking-[0.1em] transition-opacity ${
            isLifestyle ? "text-[#1C1A17]" : "text-white"
          } ${locale === l ? "opacity-100" : "opacity-30"}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSelector;