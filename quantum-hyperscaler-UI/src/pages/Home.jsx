// src/pages/Home.jsx
import styles from "../styles/home.module.css";
import { Suspense } from "react";
import Spline from "@splinetool/react-spline";
import { useEffect, useState } from "react";
// Professional icons from lucide-react
import { 
  Brain, Layers, Cpu, CircuitBoard, Cloud, Network,
  Shield, Bolt, Truck, FlaskConical, Sparkles, Zap,
  Activity, Database, Lock, Globe, ChevronRight,
  ArrowRight, CheckCircle, TrendingUp
} from "lucide-react";

function TypewriterImpact() {
  const full = "Real-World\nImpact, Today"; // \n forces next line
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setTyped(full);
      return;
    }

    let i = 0;
    let dir = 1;              // 1 = typing, -1 = deleting
    let t;
    const typeSpeed = 60;     // ms per char while typing
    const deleteSpeed = 35;   // ms per char while deleting
    const pauseEnd = 1200;    // hold after full text
    const pauseStart = 500;   // hold after fully deleted

    const tick = () => {
      setTyped(full.slice(0, i));
      if (dir === 1) {
        if (i < full.length) {
          i += 1; t = setTimeout(tick, typeSpeed);
        } else {
          dir = -1; t = setTimeout(tick, pauseEnd);
        }
      } else {
        if (i > 0) {
          i -= 1; t = setTimeout(tick, deleteSpeed);
        } else {
          dir = 1; t = setTimeout(tick, pauseStart);
        }
      }
    };

    tick();
    return () => clearTimeout(t);
  }, []);

  return (
    <span className={styles.impactText} aria-label="Real-World Impact, Today">
      <span className={styles.typeLine}>{typed}</span>
      {/* <span className={styles.caret} aria-hidden="true">|</span> */}
    </span>
  );
}
export default function Home() {
  const fullText = "Real-World Impact, Today";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(fullText);
      setDone(true);
      return;
    }

    let i = 0;
    const speed = 45; // ms per character (tweak to taste)
    const id = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        setDone(true);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, []);

  return (
    <main className={styles.mainWrapper}>
      {/* === Hero Section === */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Sparkles className={styles.badgeIcon} />
              <span>Next-Gen Technology</span>
            </div>
            
              <h1 className={styles.heroTitle}>
                <span className={styles.gradientText}>Quantum + AI</span>
                <TypewriterImpact />
            </h1>
            
            <p className={styles.heroDescription}>
              Turning advanced technology into solutions that deliver measurable ROI. 
              We bridge the gap between cutting-edge innovation and practical business outcomes.
            </p>
            
            <div className={styles.heroCTA}>
              <button className={styles.primaryButton}>
                Get Started
                <ArrowRight className={styles.buttonIcon} />
              </button>
              <button className={styles.secondaryButton}>
                Watch Demo
              </button>
            </div>
            
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <CheckCircle className={styles.trustIcon} />
                <span>Enterprise Ready</span>
              </div>
              <div className={styles.trustItem}>
                <Lock className={styles.trustIcon} />
                <span>SOC 2 Compliant</span>
              </div>
              <div className={styles.trustItem}>
                <Globe className={styles.trustIcon} />
                <span>Global Scale</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <Suspense fallback={
              <div className={styles.loadingOrb}>
                <div className={styles.orbPulse} />
              </div>
            }>
              <div className={styles.splineContainer}>
                <Spline scene="/3d/scene.splinecode" />
              </div>
            </Suspense>
          </div>
        </div>
        
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* === Solutions Section === */}
      <section className={styles.solutions}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Solutions</span>
            <h2 className={styles.sectionTitle}>
              Your Partner in AI and Quantum Innovation
            </h2>
            <p className={styles.sectionDescription}>
              From intelligent automation to quantum-scale problem solving, we provide 
              end-to-end solutions that reduce complexity and maximize outcomes.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            <article className={styles.solutionCard}>
              <div className={styles.cardIcon}>
                <Brain />
              </div>
              <h3>Enterprise Gen-AI Solutions</h3>
              <p>
                Deploy practical Gen-AI across your organization with autonomous agents, 
                vision & language models, and decision intelligence built for measurable ROI.
              </p>
              <a href="#" className={styles.cardLink}>
                Learn More <ChevronRight />
              </a>
            </article>

            <article className={styles.solutionCard}>
              <div className={styles.cardIcon}>
                <Cpu />
              </div>
              <h3>Quantum-enabled Solutions</h3>
              <p>
                Break through classical limits in optimization and simulation. 
                We translate quantum methods into real-world impact for your industry.
              </p>
              <a href="#" className={styles.cardLink}>
                Learn More <ChevronRight />
              </a>
            </article>

            <article className={styles.solutionCard}>
              <div className={styles.cardIcon}>
                <Layers />
              </div>
              <h3>Full Stack Integration</h3>
              <p>
                One cohesive stack from data pipelines to quantum compute. 
                Faster delivery, lower TCO, and future-proof innovation.
              </p>
              <a href="#" className={styles.cardLink}>
                Learn More <ChevronRight />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* === Quantum Computing Section === */}
      <section className={styles.quantum}>
        <div className={styles.quantumContainer}>
          <div className={styles.quantumHeader}>
            <h2 className={styles.quantumTitle}>
              <span>Enterprise-ready</span>
              <span className={styles.quantumHighlight}>Quantum Computing</span>
            </h2>
          </div>

          <div className={styles.quantumGrid}>
            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Zap />
              </div>
              <h3>AI to Quantum</h3>
              <p>Integrate AI with Quantum Computing for high-dimensional problems</p>
            </article>

            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Database />
              </div>
              <h3>Full-Stack Solutions</h3>
              <p>Complete stack engineered for seamless enterprise integration</p>
            </article>

            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Activity />
              </div>
              <h3>Application Optimized</h3>
              <p>Custom quantum solutions aligned to your industry needs</p>
            </article>

            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Cloud />
              </div>
              <h3>QCaaS</h3>
              <p>On-demand quantum resources with hybrid execution</p>
            </article>

            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Network />
              </div>
              <h3>Quantum Cloud</h3>
              <p>Secure, scalable cloud access to quantum backends</p>
            </article>

            <article className={styles.quantumCard}>
              <div className={styles.quantumCardIcon}>
                <Lock />
              </div>
              <h3>Governance & Security</h3>
              <p>Enterprise controls across classical and quantum pipelines</p>
            </article>
          </div>
        </div>
      </section>

      {/* === Industry Verticals === */}
      <section className={styles.verticals}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Industries</span>
            <h2 className={styles.sectionTitle}>Industry Verticals</h2>
            <p className={styles.sectionDescription}>
              Focused offerings where Quantum + AI deliver real outcomes
            </p>
          </div>

          <div className={styles.verticalsGrid}>
            <article className={styles.verticalCard}>
              <div className={styles.verticalIcon}>
                <Shield />
              </div>
              <h3>Cybersecurity</h3>
              <p>Post-quantum readiness, anomaly detection, and automated incident response</p>
              <div className={styles.verticalStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>99.9%</span>
                  <span className={styles.statLabel}>Threat Detection</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>50%</span>
                  <span className={styles.statLabel}>Faster Response</span>
                </div>
              </div>
            </article>

            <article className={styles.verticalCard}>
              <div className={styles.verticalIcon}>
                <Bolt />
              </div>
              <h3>Energy</h3>
              <p>Grid optimization and renewable scheduling with quantum-classical solvers</p>
              <div className={styles.verticalStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>30%</span>
                  <span className={styles.statLabel}>Cost Reduction</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>2x</span>
                  <span className={styles.statLabel}>Efficiency Gain</span>
                </div>
              </div>
            </article>

            <article className={styles.verticalCard}>
              <div className={styles.verticalIcon}>
                <Truck />
              </div>
              <h3>Logistics</h3>
              <p>Vehicle routing and inventory placement at real-world scale</p>
              <div className={styles.verticalStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>40%</span>
                  <span className={styles.statLabel}>Route Optimization</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>25%</span>
                  <span className={styles.statLabel}>Cost Savings</span>
                </div>
              </div>
            </article>

            <article className={styles.verticalCard}>
              <div className={styles.verticalIcon}>
                <FlaskConical />
              </div>
              <h3>Pharmaceuticals</h3>
              <p>Molecule screening and trial design optimization</p>
              <div className={styles.verticalStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>10x</span>
                  <span className={styles.statLabel}>Faster Discovery</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>60%</span>
                  <span className={styles.statLabel}>Cost Reduction</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* === Industry Applications Grid === */}
      <section className={styles.applications}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Applications</span>
            <h2 className={styles.sectionTitle}>Industry Applications in Action</h2>
            <p className={styles.sectionDescription}>
              Transforming industries with quantum computing and AI through 
              advanced simulations, optimization, and predictive analytics
            </p>
          </div>

          <div className={styles.applicationsGrid}>
            {[
              {
                title: "Life Sciences",
                description: "Accelerated drug discovery and biomolecular simulations",
                image: "/images/pharma.jpg",
                tags: ["Drug Discovery", "Genomics", "Clinical Trials"]
              },
              {
                title: "Materials Science",
                description: "New material discovery and nanostructure optimization",
                image: "/images/materials.jpg",
                tags: ["Nanotech", "Chemistry", "R&D"]
              },
              {
                title: "Manufacturing",
                description: "Process optimization and predictive maintenance",
                image: "/images/manufacturing.jpg",
                tags: ["Automation", "Quality", "Efficiency"]
              },
              {
                title: "Supply Chain",
                description: "Route optimization and demand forecasting",
                image: "/images/logistics.jpg",
                tags: ["Logistics", "Inventory", "Planning"]
              },
              {
                title: "Energy & Utilities",
                description: "Grid optimization and renewable integration",
                image: "/images/energy.jpg",
                tags: ["Smart Grid", "Renewables", "Distribution"]
              },
              {
                title: "Automotive",
                description: "Next-gen vehicle design and aerodynamics",
                image: "/images/automotive.jpg",
                tags: ["Design", "Simulation", "Testing"]
              },
              {
                title: "Telecom",
                description: "Network optimization and traffic management",
                image: "/images/telecom.jpg",
                tags: ["5G", "Networks", "Security"]
              },
              {
                title: "Financial Services",
                description: "Risk modeling and portfolio optimization",
                image: "/images/banking.jpg",
                tags: ["Risk", "Trading", "Compliance"]
              }
            ].map((app, index) => (
              <article key={index} className={styles.appCard}>
                <div 
                  className={styles.appImage} 
                  style={{backgroundImage: `url('${app.image}')`}}
                >
                  <div className={styles.appOverlay}>
                    <div className={styles.appContent}>
                      <h3>{app.title}</h3>
                      <p>{app.description}</p>
                      <div className={styles.appTags}>
                        {app.tags.map((tag, i) => (
                          <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}