"use client";

import { motion, useReducedMotion } from "framer-motion";
import { careerNodes, type CareerNode, type Lane } from "@/data/career-graph";
import { experiences } from "@/data/experience";

const DRAW_SECONDS = 2.4;

interface Point {
  x: number;
  y: number;
}

interface PlacedNode extends CareerNode, Point {
  /** Fraction of the total edge length at which the pen reaches this node. */
  reachedAt: number;
}

interface Layout {
  width: number;
  height: number;
  orientation: "horizontal" | "vertical";
  /** Cross-axis position of each lane. */
  lanes: Record<Lane, number>;
  /** Main-axis range the timeline is spread over. */
  start: number;
  end: number;
  minGap: number;
}

const HORIZONTAL: Layout = {
  width: 1000,
  height: 214,
  orientation: "horizontal",
  lanes: { research: 66, industry: 150 },
  start: 120,
  end: 968,
  minGap: 84,
};

const VERTICAL: Layout = {
  width: 340,
  height: 560,
  orientation: "vertical",
  lanes: { research: 40, industry: 196 },
  start: 64,
  end: 536,
  minGap: 58,
};

const firstYear = careerNodes[0].start;
const lastYear = careerNodes[careerNodes.length - 1].start;

// Place nodes by start year, keep a minimum gap so labels never collide,
// then compress back into the available range.
function mainAxis(layout: Layout): number[] {
  const scale = (layout.end - layout.start) / (lastYear - firstYear);
  const raw: number[] = [];
  for (const node of careerNodes) {
    const byYear = layout.start + (node.start - firstYear) * scale;
    const prev = raw[raw.length - 1];
    raw.push(prev === undefined ? byYear : Math.max(byYear, prev + layout.minGap));
  }
  const overflow = (raw[raw.length - 1] - layout.start) / (layout.end - layout.start);
  return raw.map((v) => layout.start + (v - layout.start) / Math.max(1, overflow));
}

function place(layout: Layout): { nodes: PlacedNode[]; path: string } {
  const axis = mainAxis(layout);
  const points: Point[] = careerNodes.map((node, i) =>
    layout.orientation === "horizontal"
      ? { x: axis[i], y: layout.lanes[node.lane] }
      : { x: layout.lanes[node.lane], y: axis[i] }
  );

  // Orthogonal routing: a lane change gets an elbow halfway between nodes.
  const segments: Point[] = [points[0]];
  const lengthAt: number[] = [0];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (layout.orientation === "horizontal" && a.y !== b.y) {
      const mid = (a.x + b.x) / 2;
      segments.push({ x: mid, y: a.y }, { x: mid, y: b.y });
    } else if (layout.orientation === "vertical" && a.x !== b.x) {
      const mid = (a.y + b.y) / 2;
      segments.push({ x: a.x, y: mid }, { x: b.x, y: mid });
    }
    segments.push(b);
    total += Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
    lengthAt.push(total);
  }

  const path = segments
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const nodes = careerNodes.map((node, i) => ({
    ...node,
    ...points[i],
    reachedAt: lengthAt[i] / total,
  }));

  return { nodes, path };
}

function roleFor(target: string): string {
  return experiences.find((e) => e.id === target)?.role ?? "";
}

function Graph({ layout, className }: { layout: Layout; className?: string }) {
  const reduce = useReducedMotion();
  const { nodes, path } = place(layout);
  const current = nodes[nodes.length - 1];
  const horizontal = layout.orientation === "horizontal";

  const at = (fraction: number) => ({
    duration: 0.25,
    delay: reduce ? 0 : fraction * DRAW_SECONDS,
  });

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={className}
      aria-labelledby={`career-${layout.orientation}-title`}
    >
      <title id={`career-${layout.orientation}-title`}>
        {`Career path from research to industry, ${firstYear} to today`}
      </title>

      {/* Lane guides */}
      {(Object.keys(layout.lanes) as Lane[]).map((lane) => {
        const pos = layout.lanes[lane];
        const name = lane === "research" ? "Research" : "Industry";
        return horizontal ? (
          <g key={lane}>
            <line
              x1={96}
              x2={layout.width}
              y1={pos}
              y2={pos}
              className="stroke-line"
              strokeDasharray="2 6"
            />
            <text
              x={0}
              y={pos + 5}
              className="fill-ink-muted font-cond"
              fontSize={15}
              fontWeight={500}
            >
              {name}
            </text>
          </g>
        ) : (
          <g key={lane}>
            <line
              x1={pos}
              x2={pos}
              y1={36}
              y2={layout.height}
              className="stroke-line"
              strokeDasharray="2 6"
            />
            <text
              x={pos - 6}
              y={18}
              className="fill-ink-muted font-cond"
              fontSize={15}
              fontWeight={500}
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* The route not yet travelled, then the pen drawing over it */}
      <path d={path} fill="none" className="stroke-line" strokeWidth={1.5} />
      <motion.path
        d={path}
        fill="none"
        className="stroke-ink"
        strokeWidth={1.75}
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DRAW_SECONDS, ease: "linear" }}
      />

      {nodes.map((node) => {
        const isCurrent = node === current;
        const labelPos = horizontal
          ? node.lane === "research"
            ? { x: node.x, y: node.y - 32, anchor: "middle" as const }
            : { x: node.x, y: node.y + 34, anchor: "middle" as const }
          : { x: node.x + 16, y: node.y - 2, anchor: "start" as const };
        const yearDy = horizontal ? 18 : 17;

        return (
          <a
            key={node.target}
            href={`#exp-${node.target}`}
            className="graph-node"
            aria-label={`${node.label}, from ${node.start}: ${roleFor(node.target)}`}
          >
            {/* Generous invisible hit area */}
            <circle cx={node.x} cy={node.y} r={22} fill="transparent" />
            <circle
              cx={node.x}
              cy={node.y}
              r={15}
              fill="none"
              className="focus-ring stroke-signal"
              strokeWidth={2}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={7}
              className="fill-sheet stroke-line"
              strokeWidth={1.5}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={7}
              className={isCurrent ? "fill-signal stroke-signal" : "fill-sheet stroke-ink"}
              strokeWidth={1.75}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={at(node.reachedAt)}
            />
            {isCurrent && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={11}
                fill="none"
                className="stroke-signal"
                strokeWidth={1.5}
                initial={reduce ? false : { opacity: 0, r: 7 }}
                animate={{ opacity: 1, r: 11 }}
                transition={{ ...at(1), duration: 0.5 }}
              />
            )}
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor={labelPos.anchor}
              className={
                isCurrent
                  ? "node-label fill-signal font-cond"
                  : "node-label fill-ink font-cond"
              }
              fontSize={17}
              fontWeight={600}
            >
              {node.label}
            </text>
            <text
              x={labelPos.x}
              y={labelPos.y + yearDy}
              textAnchor={labelPos.anchor}
              className="fill-ink-muted figures"
              fontSize={14}
              fontWeight={500}
            >
              {node === current ? `${node.start}–today` : node.start}
            </text>
          </a>
        );
      })}
    </svg>
  );
}

export function CareerGraph() {
  return (
    <nav aria-label="Career path">
      <Graph layout={HORIZONTAL} className="hidden lg:block w-full h-auto" />
      <Graph
        layout={VERTICAL}
        className="lg:hidden w-full max-w-[420px] h-auto"
      />
    </nav>
  );
}
