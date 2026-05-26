import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { Cloud, fetchSimpleIcons, type ICloud, type SimpleIcon } from "react-icon-cloud";

export interface TechStackSphereProps {
  /** Sphere radius in px. The rendered canvas is `2 * radius` wide and tall. Defaults to 240. */
  radius?: number;
  /** Idle auto-rotation speed (TagCanvas `minSpeed`). Defaults to 0.02. */
  speed?: number;
  /** Peak rotation speed reached as the cursor nears the sphere edge (TagCanvas `maxSpeed`). Defaults to 0.1. */
  hoverSpeed?: number;
  className?: string;
  style?: CSSProperties;
}

const SIMPLE_ICON_SLUGS = [
  "react",
  "typescript",
  "tailwindcss",
  "laravel",
  "mysql",
  "docker",
  "github",
  "git",
  "postman",
  "html5",
  "css3",
  "php",
  "nodedotjs",
  "vite",
  "bootstrap",
] as const;

const ICON_LINKS: Record<string, string> = {
  react: "https://react.dev",
  typescript: "https://www.typescriptlang.org",
  tailwindcss: "https://tailwindcss.com",
  laravel: "https://laravel.com",
  mysql: "https://www.mysql.com",
  docker: "https://www.docker.com",
  github: "https://github.com",
  git: "https://git-scm.com",
  postman: "https://www.postman.com",
  html5: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  css3: "https://developer.mozilla.org/en-US/docs/Web/!",
  php: "https://www.php.net",
  nodedotjs: "https://nodejs.org",
  vite: "https://vite.dev",
  bootstrap: "https://getbootstrap.com",
};

const FALLBACK_HEX = "#e2e8f0";

// Perceived-luminance dark check — icons darker than this get the light fallback fill so they stay visible on bg-bg-deep.
function isLowContrastOnDark(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 96;
}

function buildSimpleIconSrc(icon: SimpleIcon): string {
  const color = isLowContrastOnDark(icon.hex) ? FALLBACK_HEX : `#${icon.hex.replace("#", "")}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42" height="42" fill="${color}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// simple-icons v14 (what react-icon-cloud pins to) dropped Microsoft brand icons,
// and there is no stable shadcn slug — render these from inline SVG data URLs.
const SHADCN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="42" height="42"><path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"/><path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"/><path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"/><path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"/></svg>`;
const VSCODE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007ACC" width="42" height="42"><path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`;
const MSSQL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CC2927" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="42" height="42"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`;

const SHADCN_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(SHADCN_SVG)}`;
const VSCODE_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(VSCODE_SVG)}`;
const MSSQL_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(MSSQL_SVG)}`;

interface CustomIconAnchorProps {
  href: string;
  title: string;
  src: string;
}

function CustomIconAnchor({ href, title, src }: CustomIconAnchorProps): ReactElement {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <img height={42} width={42} alt={title} src={src} />
    </a>
  );
}

// TagCanvas needs explicit pixel dimensions, so derive a viewport-aware radius
// (capped by the prop) instead of trying to size the canvas via CSS.
function getResponsiveRadius(maxRadius: number, vw: number): number {
  if (vw < 380) return Math.min(maxRadius, 110);
  if (vw < 640) return Math.min(maxRadius, 130);
  if (vw < 768) return Math.min(maxRadius, 150);
  if (vw < 1024) return Math.min(maxRadius, 170);
  return maxRadius;
}

export default function TechStackSphere({
  radius = 240,
  speed = 0.02,
  hoverSpeed = 0.1,
  className = "",
  style,
}: TechStackSphereProps) {
  type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;
  const [data, setData] = useState<IconData | null>(null);
  const [responsiveRadius, setResponsiveRadius] = useState<number>(() =>
    typeof window === "undefined" ? radius : getResponsiveRadius(radius, window.innerWidth),
  );

  useEffect(() => {
    let cancelled = false;
    fetchSimpleIcons({ slugs: [...SIMPLE_ICON_SLUGS] }).then((res) => {
      if (!cancelled) setData(res);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setResponsiveRadius(getResponsiveRadius(radius, window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [radius]);

  const renderedIcons = useMemo<ReactElement[] | null>(() => {
    if (!data) return null;
    return [
      ...Object.values(data.simpleIcons).map((icon) => (
        <CustomIconAnchor
          key={icon.slug}
          href={ICON_LINKS[icon.slug] ?? "#"}
          title={icon.title}
          src={buildSimpleIconSrc(icon)}
        />
      )),
      <CustomIconAnchor
        key="shadcnui"
        href="https://ui.shadcn.com"
        title="shadcn/ui"
        src={SHADCN_DATA_URL}
      />,
      <CustomIconAnchor
        key="vscode"
        href="https://code.visualstudio.com"
        title="Visual Studio Code"
        src={VSCODE_DATA_URL}
      />,
      <CustomIconAnchor
        key="mssql"
        href="https://www.microsoft.com/en-us/sql-server"
        title="Microsoft SQL Server"
        src={MSSQL_DATA_URL}
      />,
    ];
  }, [data]);

  const cloudProps = useMemo<Omit<ICloud, "children">>(
    () => ({
      containerProps: {
        style: {
          width: responsiveRadius * 2,
          height: responsiveRadius * 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      options: {
        // billboarded icons are TagCanvas's default — `noMouse: false` and no `freezeActive` keeps them face-on.
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "pointer",
        tooltip: "native",
        initial: [0.1, -0.1],
        // Follow the icon's href immediately on click/tap. On touch devices there is no
        // hover to pre-position an icon at the front, so a `clickToFront` delay would
        // require two taps to navigate.
        clickToFront: false,
        tooltipDelay: 0,
        outlineColour: "#0000",
        // Cursor position drives rotation; speed ramps from `minSpeed` (idle) → `maxSpeed` (hover near edge).
        dragControl: false,
        maxSpeed: hoverSpeed,
        minSpeed: speed,
      },
    }),
    [responsiveRadius, speed, hoverSpeed],
  );

  const diameter = responsiveRadius * 2;

  return (
    <div
      className={[
        "relative flex max-w-full items-center justify-center rounded-full",
        "bg-bg-deep ring-1 ring-border shadow-glow-indigo",
        "aspect-square p-3 sm:p-4 md:p-6",
        className,
      ].join(" ")}
      style={style}
    >
      {renderedIcons ? (
        // Re-key on diameter so TagCanvas reinitializes with the new size when the viewport changes.
        <Cloud key={diameter} {...cloudProps}>
          {renderedIcons}
        </Cloud>
      ) : (
        <div
          aria-hidden
          style={{ width: diameter, height: diameter }}
          className="flex items-center justify-center"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-cyan400 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
