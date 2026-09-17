type ProjectGlyphProps = {
  kind: string;
};

export function ProjectGlyph({ kind }: ProjectGlyphProps) {
  if (kind === "plot") {
    return (
      <svg viewBox="0 0 420 250" role="img" aria-label="Abstract site plan illustration">
        <path d="M64 63 236 32l117 52-171 39z" />
        <path d="m64 63 1 104 117 54V123z" />
        <path d="m182 123 171-39v97l-171 40z" />
        <path d="m105 71 172 51M123 59l173 51M181 123v97M236 32l-1 104" />
        <circle cx="271" cy="139" r="13" />
        <path d="M271 126v-30m-12 30h24" />
        <path d="M82 185c12-24 26-24 39 0m-22-7c8-15 18-14 27 2" />
      </svg>
    );
  }
  if (kind === "nodes") {
    return (
      <svg viewBox="0 0 420 250" role="img" aria-label="Connected processing nodes">
        <path d="M113 126h84m34 0h79M213 108V70m0 74v38" />
        <rect x="48" y="99" width="65" height="54" rx="10" />
        <rect x="197" y="99" width="34" height="54" rx="9" />
        <rect x="310" y="99" width="64" height="54" rx="10" />
        <circle cx="213" cy="54" r="16" /><circle cx="213" cy="204" r="16" />
        <path d="M60 117h40m-40 17h28m220-17h39m-39 17h25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label="Data synchronization cycle">
      <path d="M273 87a75 75 0 0 0-126-22l-18 17m0 0V41m0 41h40M147 163a75 75 0 0 0 126 22l18-17m0 0v41m0-41h-40" />
      <rect x="174" y="98" width="72" height="54" rx="9" />
      <path d="M190 116h40m-40 18h28" />
      <circle cx="105" cy="134" r="6" /><circle cx="321" cy="116" r="6" />
    </svg>
  );
}
