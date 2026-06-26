import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Brain,
  ChartLine,
  Zap,
  Users,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import './LandingPage.css';

const FEATURES = [
  {
    icon: FileText,
    iconBg: '#EDE9FE',
    iconColor: '#6C5CE7',
    title: 'Resume-based questions',
    description:
      'Upload your PDF resume and we auto-generate role-specific questions from your actual experience.',
  },
  {
    icon: Brain,
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    title: 'Real-time AI evaluation',
    description:
      'Every answer is scored by Gemini AI with feedback on depth, clarity, and technical accuracy.',
  },
  {
    icon: ChartLine,
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
    title: 'Progress analytics',
    description:
      'Track your scores over time with breakdowns by category — DSA, System Design, Behavioral.',
  },
  {
    icon: Zap,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    title: 'Live WebSocket sessions',
    description:
      'Interview sessions run in real-time over WebSocket, with a countdown timer and live feedback streaming.',
  },
  {
    icon: Users,
    iconBg: '#FCE7F3',
    iconColor: '#BE185D',
    title: 'Role-based dashboards',
    description:
      'Separate views for candidates, recruiters, and admins — each with relevant controls and data.',
  },
  {
    icon: ShieldCheck,
    iconBg: '#EDE9FE',
    iconColor: '#6C5CE7',
    title: 'Secure by default',
    description:
      'JWT auth, refresh token rotation, Redis session caching, and S3-backed resume storage.',
  },
];

const FLOW_STEPS = [
  {
    num: 1,
    title: 'Upload your resume',
    description: 'Drop your PDF — we parse skills, experience, and role context automatically.',
  },
  {
    num: 2,
    title: 'Pick your target role',
    description: "Choose the job you're interviewing for. Gemini tailors 10 questions to match.",
  },
  {
    num: 3,
    title: 'Start the session',
    description: 'Answer questions live — a countdown timer keeps the pressure realistic.',
  },
  {
    num: 4,
    title: 'Get your feedback',
    description: 'Receive a scored report with AI feedback per answer and an overall session summary.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <nav className="nav">
        <button type="button" className="logo" onClick={() => navigate('/')}>
          <div className="logo-mark">P</div>
          PrepAI
        </button>
        <div className="nav-links">
          <button type="button" onClick={() => scrollTo('how-it-works')}>
            How it works
          </button>
          <button type="button" onClick={() => scrollTo('features')}>
            Features
          </button>
          <button type="button" onClick={() => navigate('/login')}>
            Dashboard
          </button>
        </div>
        <div className="nav-cta">
          <button type="button" className="btn-ghost" onClick={() => navigate('/login')}>
            Log in
          </button>
          <button type="button" className="btn-primary" onClick={() => navigate('/register')}>
            Get started
          </button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-eyebrow">
          <Sparkles size={14} aria-hidden="true" />
          Powered by Gemini AI
        </div>
        <h1>
          Ace your next interview
          <br />
          with <em>AI-driven</em> practice
        </h1>
        <p>
          Upload your resume, pick a role, and get a real-time mock interview tailored to you — with
          instant AI feedback on every answer.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn-lg-primary" onClick={() => navigate('/register')}>
            Start practising free <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="btn-lg-ghost" onClick={() => scrollTo('how-it-works')}>
            See how it works
          </button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="stat-num">12k+</div>
          <div className="stat-label">Mock interviews completed</div>
        </div>
        <div className="stat">
          <div className="stat-num">94%</div>
          <div className="stat-label">Users felt more confident</div>
        </div>
        <div className="stat">
          <div className="stat-num">30+</div>
          <div className="stat-label">Job roles covered</div>
        </div>
        <div className="stat">
          <div className="stat-num">2 min</div>
          <div className="stat-label">Avg. setup time</div>
        </div>
      </div>

      <div className="section" id="features">
        <div className="section-label">Features</div>
        <div className="section-title">Everything you need to prepare</div>
        <div className="section-sub">From resume parsing to live AI evaluation — in one platform.</div>
        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon" style={{ background: iconBg }}>
                <Icon size={20} color={iconColor} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flow-section" id="how-it-works">
        <div className="flow-inner">
          <div className="section-label">How it works</div>
          <div className="section-title">From resume to feedback in minutes</div>
          <div className="flow-steps">
            {FLOW_STEPS.map(({ num, title, description }) => (
              <div key={num} className="flow-step">
                <div className="step-num">{num}</div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Preview</div>
        <div className="section-title">What a session looks like</div>
        <div className="session-preview">
          <div className="session-header">
            <div className="session-header-left">
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Mock interview</span>
              <span className="session-badge">Backend engineer</span>
            </div>
            <div className="session-timer">
              <Clock size={14} aria-hidden="true" /> 3:42 remaining
            </div>
          </div>
          <div className="question-block">
            <div className="q-meta">
              <span className="tag tag-diff">Medium</span>
              <span className="tag tag-cat">System design</span>
            </div>
            <div className="q-text">
              You have Redis and MongoDB in your stack. Explain how you&apos;d decide what to cache
              and for how long.
            </div>
            <div className="answer-box" />
          </div>
          <div className="session-footer">
            <div className="progress-wrap">
              <span className="progress-text">Q 3 of 10</span>
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
            </div>
            <button type="button" className="btn-primary" style={{ fontSize: '13px', padding: '7px 16px' }}>
              Submit answer
            </button>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to land the role?</h2>
        <p>Your first mock interview is completely free. No credit card needed.</p>
        <button type="button" className="btn-lg-primary" onClick={() => navigate('/register')}>
          Create your free account <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
