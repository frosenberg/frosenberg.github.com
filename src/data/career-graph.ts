export type Lane = "research" | "industry";

export interface CareerNode {
  /** Matches an experience id; the node links to `#exp-${target}`. */
  target: string;
  label: string;
  lane: Lane;
  start: number;
}

// Chronological order; edges connect consecutive nodes.
export const careerNodes: CareerNode[] = [
  { target: "tuwien", label: "TU Wien", lane: "research", start: 2005 },
  { target: "csiro", label: "CSIRO", lane: "research", start: 2009 },
  { target: "ibm", label: "IBM", lane: "research", start: 2011 },
  { target: "braintribe", label: "Braintribe", lane: "industry", start: 2017 },
  { target: "aim", label: "AIM", lane: "industry", start: 2018 },
  { target: "crayon-cto", label: "Crayon", lane: "industry", start: 2019 },
  { target: "esko", label: "Esko", lane: "industry", start: 2025 },
  { target: "truvio", label: "Truvio", lane: "industry", start: 2026 },
];
