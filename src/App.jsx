import { useEffect, useRef, useState } from 'react'
import {
  Moon,
  Share2,
  Sun,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

const PRIMARY = 'var(--color-primary)'
const PRIMARY_HOVER = 'var(--color-primary-hover)'

const FALLBACK_RATIONALE =
  "I would recommend Carrier A because the equipment breakdown protection matters more for this HVAC client than the slight premium difference. Carrier B's roof-related exclusion creates too much room for a bad surprise at claim time."

function TealLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path d="M16 2L28 9.5V22.5L16 30L4 22.5V9.5L16 2Z" fill="#01696f" />
      <path
        d="M16 8L22 12V20L16 24L10 20V12L16 8Z"
        fill="rgba(247,246,242,0.92)"
      />
    </svg>
  )
}

function ChipGroup({ label, hint, options, value, onChange, name }) {
  const base =
    'inline-flex items-center justify-center rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-200 min-h-[40px] min-w-0'
  const idle =
    'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]'
  const active =
    'border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-text)] shadow-[0_1px_0_rgba(40,37,29,0.06)]'

  return (
    <div className="space-y-2">
      <p className="text-[length:max(12px,0.75rem)] font-medium text-[var(--color-text)]">
        {label}
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={selected}
              name={name}
              className={`${base} ${selected ? active : idle}`}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      <p className="text-[length:max(12px,0.75rem)] text-[var(--color-muted)] leading-snug">
        {hint}
      </p>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState('light')
  const [trustScore, setTrustScore] = useState(72)
  const [signalsCaptured, setSignalsCaptured] = useState(18)
  const [clarity, setClarity] = useState(81)
  const [quotePick, setQuotePick] = useState('Carrier A')
  const [reason, setReason] = useState('Coverage safer')
  const [usage, setUsage] = useState('Suggest similar cases')
  const [rationale, setRationale] = useState(FALLBACK_RATIONALE)
  const [saveUi, setSaveUi] = useState('idle')
  const [kpiTick, setKpiTick] = useState(false)
  const saveTimeout = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const handleSave = () => {
    if (rationale.trim().length < 40) {
      setRationale(FALLBACK_RATIONALE)
    }

    setTrustScore((v) => Math.min(96, v + 4))
    setSignalsCaptured((v) => v + 1)
    setClarity((v) => Math.min(95, v + 2))

    setKpiTick(true)
    window.setTimeout(() => setKpiTick(false), 500)

    setSaveUi('saved')
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = window.setTimeout(() => {
      setSaveUi('idle')
      saveTimeout.current = null
    }, 1200)
  }

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
    }
  }, [])

  const toggleTheme = () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <div
      className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)] antialiased"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <a
        href="#main-workspace"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to broker workspace
      </a>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 md:gap-6 md:p-6 min-[1200px]:grid-cols-[260px_minmax(0,1fr)] min-[1200px]:gap-8">
        {/* Mobile / tablet: nav (hidden on large desktop) */}
        <section
          className="col-span-full min-[1200px]:hidden"
          aria-label="Prototype context"
        >
          <div className="mb-4 flex items-center gap-3">
            <TealLogo />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Harper prototype
              </p>
              <p className="text-base font-semibold">Broker Judgment Studio</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Sections">
            {[
              'Coverage Review',
              'Submission Intake',
              'Client Recommendation',
              'Renewal Notes',
            ].map((label) => (
              <button
                key={label}
                type="button"
                className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  label === 'Coverage Review'
                    ? 'bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] text-[var(--color-text)]'
                    : 'border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </section>

        {/* Left sidebar */}
        <aside className="hidden min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:gap-6">
          <div className="flex items-start gap-3">
            <TealLogo />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Harper prototype
              </p>
              <h1 className="mt-1 text-lg font-semibold leading-tight text-[var(--color-text)]">
                Broker Judgment Studio
              </h1>
            </div>
          </div>

          <nav className="space-y-1" aria-label="Primary">
            {[
              ['Coverage Review', true],
              ['Submission Intake', false],
              ['Client Recommendation', false],
              ['Renewal Notes', false],
            ].map(([label, active]) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] text-[var(--color-text)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
                }`}
              >
                {active && (
                  <ChevronRight className="h-4 w-4 text-[var(--color-primary)]" />
                )}
                <span className={active ? 'pl-0' : 'pl-6'}>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main column */}
        <main
          id="main-workspace"
          className="flex min-w-0 flex-col gap-6"
          aria-label="Broker workspace"
        >
          {/* Top bar */}
          <header className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-warm)] md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                Broker-owned capture
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-transparent px-4 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)]"
                  aria-label={
                    theme === 'light'
                      ? 'Switch to dark mode'
                      : 'Switch to light mode'
                  }
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </span>
                </button>
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-text)_6%,transparent)]"
                >
                  <Share2 className="h-4 w-4" />
                  Share review
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className={`inline-flex h-11 min-w-[180px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-colors duration-300 ${
                    saveUi === 'saved'
                      ? 'bg-emerald-600 hover:bg-emerald-600'
                      : ''
                  }`}
                  style={
                    saveUi === 'saved'
                      ? undefined
                      : { backgroundColor: PRIMARY }
                  }
                  onMouseEnter={(e) => {
                    if (saveUi !== 'saved')
                      e.currentTarget.style.backgroundColor = PRIMARY_HOVER
                  }}
                  onMouseLeave={(e) => {
                    if (saveUi !== 'saved')
                      e.currentTarget.style.backgroundColor = PRIMARY
                  }}
                >
                  {saveUi === 'saved' ? (
                    <>
                      <Check className="h-4 w-4" />
                      Judgment saved
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Save judgment signal
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* KPI row */}
          <section
            aria-label="Key metrics"
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {[
              {
                label: 'Broker trust score',
                value: trustScore,
                cap: ' / 96',
              },
              {
                label: 'Signals captured',
                value: signalsCaptured,
                cap: '',
              },
              {
                label: 'Recommendation clarity',
                value: clarity,
                cap: ' / 95',
              },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-warm)]"
                style={{ borderRadius: '24px' }}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">
                  {k.label}
                </p>
                <p
                  className={`kpi-value mt-2 text-3xl font-semibold tabular-nums text-[var(--color-text)] ${kpiTick ? 'kpi-value--tick' : ''}`}
                >
                  {k.value}
                  {k.cap && (
                    <span className="text-lg font-normal text-[var(--color-muted)]">
                      {k.cap}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </section>

          {/* Broker review workspace */}
          <section
            className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-warm)] md:p-6"
            style={{ borderRadius: '24px' }}
            aria-label="Broker review workspace"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                Broker review workspace
              </h3>
              <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,#16a34a_14%,transparent)] px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                Broker-owned signal
              </span>
            </div>

            {/* Quote card */}
            <div
              className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 md:p-5"
              style={{ borderRadius: '12px' }}
            >
              <div className="mb-4 flex flex-col gap-1 border-b border-[var(--color-border)] pb-4">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Apex HVAC Services
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  14 employees · renewal due in 5 days
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[var(--color-surface)] p-3 shadow-sm ring-1 ring-[var(--color-border)]">
                  <p className="text-xs font-medium text-[var(--color-muted)]">
                    Carrier A
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">
                    $18,240
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    annual premium
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--color-surface)] p-3 shadow-sm ring-1 ring-[var(--color-border)]">
                  <p className="text-xs font-medium text-[var(--color-muted)]">
                    Carrier B
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">
                    $17,980
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    annual premium
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--color-surface)] p-3 shadow-sm ring-1 ring-[var(--color-border)]">
                  <p className="text-xs font-medium text-[var(--color-muted)]">
                    Roof exclusion
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                    Explicit on B
                  </p>
                </div>
                <div className="rounded-xl bg-[var(--color-surface)] p-3 shadow-sm ring-1 ring-[var(--color-border)]">
                  <p className="text-xs font-medium text-[var(--color-muted)]">
                    Equipment breakdown
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                    Stronger on A
                  </p>
                </div>
              </div>
            </div>

            <div
              className="space-y-6 rounded-2xl p-4 md:p-5"
              style={{
                background: 'var(--tint-teal-soft)',
                borderRadius: '24px',
              }}
            >
              <ChipGroup
                name="quote"
                label="Which quote would you recommend?"
                hint="Your call trains the system"
                options={['Carrier A', 'Carrier B', 'Need broker call']}
                value={quotePick}
                onChange={setQuotePick}
              />
              <ChipGroup
                name="reason"
                label="Primary reason for your decision"
                hint="This becomes reusable product logic"
                options={[
                  'Coverage safer',
                  'Exclusion risk too high',
                  'Client risk appetite',
                  'Price wins',
                ]}
                value={reason}
                onChange={setReason}
              />
              <div className="space-y-2">
                <p className="text-[length:max(12px,0.75rem)] font-medium text-[var(--color-text)]">
                  Explain the judgment in your own words
                </p>
                <textarea
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  rows={5}
                  className="w-full resize-y rounded-xl border border-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] bg-[var(--color-surface)] px-3 py-3 text-base leading-relaxed text-[var(--color-text)] shadow-inner outline-none ring-0 transition-shadow placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]"
                  style={{ borderRadius: '12px', minHeight: '120px' }}
                />
                <p className="text-[length:max(12px,0.75rem)] text-[var(--color-muted)] leading-snug">
                  Broker wording stays attached
                </p>
              </div>
              <ChipGroup
                name="usage"
                label="How should this be used later?"
                hint="You control the downstream use"
                options={[
                  'Suggest similar cases',
                  'Train recommendation assistant',
                  'Internal QA only',
                ]}
                value={usage}
                onChange={setUsage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
