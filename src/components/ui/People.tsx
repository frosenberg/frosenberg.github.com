import { Fragment } from "react";
import { linkedInProfiles } from "@/data/people";

const isSelf = (name: string) => /^F(\.|lorian)\s*Rosenberg$/.test(name);

/** A comma-separated list of people, linking anyone with a known LinkedIn profile. */
export function People({ names }: { names: string[] }) {
  return (
    <>
      {names.map((raw, i) => {
        const name = raw.trim();
        const profile = linkedInProfiles[name];
        return (
          <Fragment key={`${name}-${i}`}>
            {i > 0 && ", "}
            {isSelf(name) ? (
              <strong className="font-semibold text-ink">{name}</strong>
            ) : profile ? (
              <a
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-1 decoration-line hover:text-ink hover:decoration-current"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </Fragment>
        );
      })}
    </>
  );
}
