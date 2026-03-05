import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRole } from '@/context/RoleContext'
import { Calculator, DollarSign, GraduationCap, MapPin, Info, ArrowRight } from 'lucide-react'

export function BenefitsCalculatorPage() {
  const { canViewBenefits } = useRole()
  const [country, setCountry] = useState('Belgium')
  const [salary, setSalary] = useState('120000')
  const [location, setLocation] = useState('Brussels (headquarters)')
  const [policy, setPolicy] = useState('Overseas assignment 2024')
  const [result, setResult] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  if (!canViewBenefits) {
    return (
      <div className="app-page">
        <h1 className="app-page-title">Benefits Calculator</h1>
        <p className="app-page-desc">Available to Case handlers and above.</p>
        <Link to="/cases"><Button variant="secondary" className="cursor-pointer">Go to Cases</Button></Link>
      </div>
    )
  }

  const handleCalculate = () => {
    setError(null)
    const num = Number(salary)
    if (Number.isNaN(num) || num <= 0) {
      setError('Please provide a valid salary.')
      return
    }
    setResult(true)
  }

  return (
    <div className="app-page">
      <h1 className="app-page-title flex items-center gap-2">
        <Calculator className="size-5 text-primary" />
        Benefits Calculator
      </h1>
      <p className="app-page-desc">
        Calculate allowances based on country, salary, location, and applicable policy.
      </p>

      {error && (
        <Alert variant="destructive" className="mb-4 rounded-xl">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[400px_1fr]">
        {/* Input form */}
        <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
          <h2 className="text-sm font-semibold text-foreground m-0 mb-4">Input parameters</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bc-country" className="text-xs font-medium text-muted-foreground">Country</Label>
              <select
                id="bc-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer"
              >
                <option value="Belgium">Belgium</option>
                <option value="France">France</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-salary" className="text-xs font-medium text-muted-foreground">Annual salary (USD)</Label>
              <Input id="bc-salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="h-10 rounded-lg bg-muted/20 border-border" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-location" className="text-xs font-medium text-muted-foreground">Duty station</Label>
              <select
                id="bc-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer"
              >
                <option value="Brussels (headquarters)">Brussels (headquarters)</option>
                <option value="Washington, D.C.">Washington, D.C.</option>
                <option value="London">London</option>
                <option value="Paris">Paris</option>
                <option value="Singapore">Singapore</option>
                <option value="Remote (home country)">Remote (home country)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-policy" className="text-xs font-medium text-muted-foreground">Applicable policy</Label>
              <select
                id="bc-policy"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-border bg-muted/20 px-3 py-1 text-sm cursor-pointer"
              >
                <option value="Overseas assignment 2024">Overseas assignment 2024</option>
                <option value="Remote work and telework">Remote work and telework</option>
                <option value="Parental leave">Parental leave</option>
                <option value="Education allowance">Education allowance</option>
                <option value="Housing allowance">Housing allowance</option>
              </select>
            </div>
            <Button
              className="w-full h-11 cursor-pointer rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold"
              onClick={handleCalculate}
            >
              Calculate allowances
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {result ? (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground m-0">Estimated allowances</h2>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-primary shrink-0">
                  <DollarSign className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Housing allowance</div>
                  <div className="text-2xl font-bold text-foreground mt-0.5">
                    2,400 <span className="text-sm font-normal text-muted-foreground">EUR/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Per HR Policy 4.2 §3.1 — Brussels headquarters rate</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shrink-0">
                  <GraduationCap className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Education allowance</div>
                  <div className="text-2xl font-bold text-foreground mt-0.5">
                    12,000 <span className="text-sm font-normal text-muted-foreground">EUR/year</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Eligible dependents — enrollment and fee documentation required</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost of living adjustment</div>
                  <div className="text-2xl font-bold text-foreground mt-0.5">
                    +14% <span className="text-sm font-normal text-muted-foreground">of base salary</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Brussels COLA index applied for duty station</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-muted/50 border border-border px-4 py-3 mt-1">
              <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground m-0">
                Calculated for <strong>{country}</strong>, <strong>{location}</strong> under <strong>{policy}</strong>. Verify against current HR Policy before finalizing.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center">
            <Calculator className="size-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Enter parameters and click Calculate to see estimated allowances.</p>
          </div>
        )}
      </div>
    </div>
  )
}
