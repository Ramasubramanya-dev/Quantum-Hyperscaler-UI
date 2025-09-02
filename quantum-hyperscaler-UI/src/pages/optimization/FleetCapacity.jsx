import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/fleet.module.css";
import {
  Play, RotateCcw, FileUp, Cog, CircuitBoard, Wrench, CheckCircle2
} from "lucide-react";

export default function FleetCapacity() {
  const [file, setFile] = useState(null);

  // step config (seconds)
  const steps = useMemo(() => ([
    { key: "parse", label: "Parsing the file",       icon: FileUp,       dur: 2 },
    { key: "qubo",  label: "Generating QUBO",        icon: Cog,          dur: 3 },
    { key: "solve", label: "Solving",                icon: CircuitBoard, dur: 6 },
    { key: "fix",   label: "Correcting the output",  icon: Wrench,       dur: 1 },
    { key: "done",  label: "Finished",               icon: CheckCircle2, dur: 1 },
  ]), []);

  const totalDur = steps.reduce((a, s) => a + s.dur, 0);

  // animation state
  const [activeIdx, setActiveIdx] = useState(-1);  // -1 = idle
  const [elapsed, setElapsed]   = useState(0);     // secs in current step
  const [progress, setProgress] = useState(0);     // total secs
  const [running, setRunning]   = useState(false);

  // stable refs for RAF loop
  const idxRef = useRef(activeIdx);
  const runningRef = useRef(false);
  const stepStartRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => { idxRef.current = activeIdx; }, [activeIdx]);

  function start() {
    if (!file) { alert("Please upload a CVRP file first."); return; }
    setRunning(true);
    runningRef.current = true;
    setActiveIdx(0);
    setElapsed(0);
    setProgress(0);
    stepStartRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }

  function reset() {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setActiveIdx(-1);
    setElapsed(0);
    setProgress(0);
  }

  function tick(now) {
    if (!runningRef.current) return;

    const i = idxRef.current;
    if (i < 0) { rafRef.current = requestAnimationFrame(tick); return; }

    // finished all steps
    if (i >= steps.length) {
      runningRef.current = false;
      setRunning(false);
      setElapsed(0);
      setProgress(totalDur);
      return;
    }

    const dur = steps[i].dur;
    const t = (now - stepStartRef.current) / 1000; // seconds
    const clamped = Math.min(t, dur);
    setElapsed(clamped);

    const prevSecs = steps.slice(0, i).reduce((a, s) => a + s.dur, 0);
    setProgress(prevSecs + clamped);

    if (t >= dur) {
      // advance to next step
      if (i === steps.length - 1) {
        idxRef.current = steps.length;
        setActiveIdx(steps.length);
        runningRef.current = false;
        setRunning(false);
        setProgress(totalDur);
        return;
      } else {
        idxRef.current = i + 1;
        setActiveIdx(i + 1);
        setElapsed(0);
        stepStartRef.current = now;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1>Fleet &amp; Capacity Planning (CVRP)</h1>
          <p className={styles.sub}>Upload your CVRP instance (JSON/CSV), then run the quantum pipeline.</p>
        </div>

        <div className={styles.controls}>
          <label className={styles.uploadBtn} title="Upload CVRP file">
            <input
              type="file"
              accept=".json,.csv,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? `Selected: ${file.name}` : "Upload file"}
          </label>
          <button className={styles.play} onClick={start} disabled={running}>
            <Play size={18} /> Run
          </button>
          <button className={styles.reset} onClick={reset}>
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </header>

      {/* flow */}
      <section className={styles.flow}>
        {steps.map((s, i) => (
          <div key={s.key} className={styles.stepWrap}>
            <Step
              label={s.label}
              Icon={s.icon}
              state={
                activeIdx === -1               ? "idle" :
                i < activeIdx                  ? "done" :
                i === activeIdx && running     ? "active" :
                i === activeIdx && !running && activeIdx >= steps.length ? "done" :
                "idle"
              }
              highlight="#1ccdb4"
            />
            {i < steps.length - 1 && <Connector />}
            <div className={styles.time}>
              {i < activeIdx && `${steps[i].dur.toFixed(1)}s`}
              {i === activeIdx && running && `${elapsed.toFixed(1)}s / ${steps[i].dur}s`}
              {i > activeIdx && `${steps[i].dur}s`}
            </div>
          </div>
        ))}
      </section>

      {/* overall progress */}
      <footer className={styles.footer}>
        <div className={styles.progressOuter}>
          <div
            className={styles.progressInner}
            style={{ width: `${(progress / totalDur) * 100}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {progress.toFixed(1)}s / {totalDur}s
        </div>
      </footer>
    </div>
  );
}
function ConnectorFlex() {
  // stretches to fill the gap between cards; white line with arrow at the end
  return (
    <div className={styles.connectorFlex} aria-hidden="true">
      <svg viewBox="0 0 100 8" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-white-flex" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="white" />
          </marker>
        </defs>
        <line x1="0" y1="4" x2="98" y2="4" stroke="white" strokeWidth="2" markerEnd="url(#arrow-white-flex)" />
      </svg>
    </div>
  );
}

function Step({ label, Icon, state, highlight }) {
  return (
    <div
      className={[
        styles.step,
        state === "active" ? styles.active : "",
        state === "done" ? styles.done : "",
      ].join(" ")}
      data-color={highlight}
    >
      <div className={styles.iconBubble}>
        <Icon size={22} />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

function Connector() {
  // white arrow connector
  return (
    <svg className={styles.connector} viewBox="0 0 120 24" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="arrow-white" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="white" />
        </marker>
      </defs>
      <line x1="0" y1="12" x2="112" y2="12" stroke="white" strokeWidth="2" markerEnd="url(#arrow-white)" />
    </svg>
  );
}
