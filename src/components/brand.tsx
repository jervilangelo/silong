import Image from "next/image";
import Link from "next/link";
export function Brand({
  light = false,
  large = false,
  animated = false,
}: {
  light?: boolean;
  large?: boolean;
  animated?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Silong home"
      className={large ? "brand brand-large" : "brand"}
    >
      <Image
        src={`/brand/silong-wordmark-${animated ? "animated-on-dark" : light ? "on-light" : "on-dark"}.svg`}
        width={438}
        height={animated ? 248 : 198}
        alt="Silong"
        loading="eager"
      />
    </Link>
  );
}
