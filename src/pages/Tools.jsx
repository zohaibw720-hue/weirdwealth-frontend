
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  PiggyBank,
  TrendingUp,
  Wallet,
  RotateCcw,
  ArrowDownRight,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function getPositiveNumber(value, maximum = Infinity) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return Math.min(number, maximum);
}

const initialValues = {
  monthlyIncome: "5000",
  monthlyExpenses: "3000",
  initialInvestment: "1000",
  monthlyInvestment: "200",
  annualReturn: "8",
  investmentYears: "10",
};

export default function Tools() {
  const [monthlyIncome, setMonthlyIncome] = useState(
    initialValues.monthlyIncome
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    initialValues.monthlyExpenses
  );
  const [initialInvestment, setInitialInvestment] = useState(
    initialValues.initialInvestment
  );
  const [monthlyInvestment, setMonthlyInvestment] = useState(
    initialValues.monthlyInvestment
  );
  const [annualReturn, setAnnualReturn] = useState(
    initialValues.annualReturn
  );
  const [investmentYears, setInvestmentYears] = useState(
    initialValues.investmentYears
  );

  const savingsResult = useMemo(() => {
    const income = getPositiveNumber(monthlyIncome);
    const expenses = getPositiveNumber(monthlyExpenses);
    const difference = income - expenses;

    const monthlySavings = Math.max(0, difference);
    const monthlyDeficit = Math.max(0, -difference);

    const savingsRate =
      income > 0 ? (monthlySavings / income) * 100 : 0;

    const expenseRate =
      income > 0 ? Math.min(100, (expenses / income) * 100) : 0;

    return {
      income,
      expenses,
      monthlySavings,
      monthlyDeficit,
      savingsRate,
      expenseRate,
      hasDeficit: expenses > income,
    };
  }, [monthlyIncome, monthlyExpenses]);

  const investmentResult = useMemo(() => {
    const initial = getPositiveNumber(initialInvestment);
    const monthly = getPositiveNumber(monthlyInvestment);
    const annual = getPositiveNumber(annualReturn, 100);
    const years = getPositiveNumber(investmentYears, 100);

    const months = Math.round(years * 12);
    const monthlyRate = annual / 100 / 12;

    let futureValue = initial;

    for (let month = 0; month < months; month += 1) {
      futureValue = futureValue * (1 + monthlyRate) + monthly;
    }

    const investedAmount = initial + monthly * months;
    const estimatedGrowth = Math.max(0, futureValue - investedAmount);

    const growthPercentage =
      futureValue > 0 ? (estimatedGrowth / futureValue) * 100 : 0;

    return {
      futureValue,
      investedAmount,
      estimatedGrowth,
      growthPercentage,
      months,
    };
  }, [
    initialInvestment,
    monthlyInvestment,
    annualReturn,
    investmentYears,
  ]);

  function resetCalculators() {
    setMonthlyIncome(initialValues.monthlyIncome);
    setMonthlyExpenses(initialValues.monthlyExpenses);
    setInitialInvestment(initialValues.initialInvestment);
    setMonthlyInvestment(initialValues.monthlyInvestment);
    setAnnualReturn(initialValues.annualReturn);
    setInvestmentYears(initialValues.investmentYears);
  }

  const toolCards = [
    {
      icon: Wallet,
      number: "01",
      title: "Savings Calculator",
      description:
        "Understand your monthly income, expenses and potential savings.",
    },
    {
      icon: TrendingUp,
      number: "02",
      title: "Investment Calculator",
      description:
        "Explore how time, regular contributions and compound growth interact.",
    },
    {
      icon: PiggyBank,
      number: "03",
      title: "Budget Snapshot",
      description:
        "Get a clearer picture of your monthly cash flow and spending.",
    },
  ];

  return (
    <>
      <Header />

      <main className="inner-page tools-page">
        {/* PREMIUM HERO */}
        <section className="tools-hero tools-image-hero">
          <div className="tools-hero-background" aria-hidden="true" />
          <div className="tools-hero-overlay" aria-hidden="true" />

          <div className="container tools-hero-inner">
            <div className="tools-hero-copy">
              <span className="tools-eyebrow">
                <Sparkles size={15} />
                WEIRDWEALTH FINANCIAL TOOLKIT
              </span>

              <h1>
                Make smarter
                <br />
                <span>money decisions.</span>
              </h1>

              <p>
                Clarity starts with understanding your numbers.
                Explore practical calculators designed to help
                you plan, save and think ahead.
              </p>

              <a href="#financial-calculators" className="tools-hero-link">
                Explore the calculators
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="tools-hero-bottom">
            <span>WEIRDWEALTH / FINANCIAL TOOLKIT</span>
            <span>PLAN SMARTER. THINK AHEAD.</span>
          </div>
        </section>

        <section className="tools-directory section-padding">
          <div className="container">
            <div className="tools-section-heading">
              <div>
                <span className="section-eyebrow">
                  YOUR FINANCIAL TOOLKIT
                </span>

                <h2>Practical tools. Clearer decisions.</h2>
              </div>

              <p>
                Use these simple tools to explore your financial
                possibilities and build better money habits.
              </p>
            </div>

            <div className="tools-intro-grid">
              {toolCards.map((tool) => {
                const Icon = tool.icon;

                return (
                  <article className="tool-intro-card" key={tool.number}>
                    <div className="tool-intro-top">
                      <span>{tool.number}</span>
                      <div className="tool-intro-icon">
                        <Icon size={23} />
                      </div>
                    </div>

                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </article>
                );
              })}
            </div>

            <div
              className="financial-calculators"
              id="financial-calculators"
            >
              <section className="calculator-card">
                <div className="calculator-heading">
                  <div className="calculator-heading-icon">
                    <Wallet size={23} />
                  </div>

                  <div>
                    <span className="tools-card-eyebrow">
                      MONTHLY PLANNING
                    </span>
                    <h3>Savings Calculator</h3>
                  </div>
                </div>

                <p className="calculator-description">
                  Enter your monthly income and expenses to see
                  how much you could potentially save.
                </p>

                <div className="calculator-fields">
                  <label>
                    Monthly income ($)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={monthlyIncome}
                      onChange={(event) =>
                        setMonthlyIncome(event.target.value)
                      }
                      placeholder="e.g. 5000"
                    />
                  </label>

                  <label>
                    Monthly expenses ($)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={monthlyExpenses}
                      onChange={(event) =>
                        setMonthlyExpenses(event.target.value)
                      }
                      placeholder="e.g. 3000"
                    />
                  </label>
                </div>

                <div className="calculator-result" aria-live="polite">
                  <span>
                    {savingsResult.hasDeficit
                      ? "Monthly budget shortfall"
                      : "Estimated monthly savings"}
                  </span>

                  <strong>
                    {formatCurrency(
                      savingsResult.hasDeficit
                        ? savingsResult.monthlyDeficit
                        : savingsResult.monthlySavings
                    )}
                  </strong>

                  <div className="savings-progress-heading">
                    <span>Income allocation</span>
                    <span>
                      {savingsResult.expenseRate.toFixed(1)}% expenses
                    </span>
                  </div>

                  <div
                    className="savings-progress-track"
                    role="progressbar"
                    aria-label="Monthly expenses as a percentage of income"
                    aria-valuenow={Math.round(savingsResult.expenseRate)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="savings-progress-fill"
                      style={{
                        width: `${savingsResult.expenseRate}%`,
                      }}
                    />
                  </div>

                  <div className="calculator-mini-stats">
                    <div>
                      <span>Income</span>
                      <strong>{formatCurrency(savingsResult.income)}</strong>
                    </div>

                    <div>
                      <span>Expenses</span>
                      <strong>{formatCurrency(savingsResult.expenses)}</strong>
                    </div>

                    <div>
                      <span>Savings rate</span>
                      <strong>
                        {savingsResult.savingsRate.toFixed(1)}%
                      </strong>
                    </div>
                  </div>

                  {savingsResult.hasDeficit ? (
                    <p className="calculator-warning">
                      <ArrowDownRight size={15} />
                      Your expenses are higher than your income.
                      Consider reviewing your spending.
                    </p>
                  ) : (
                    <p className="calculator-positive">
                      <TrendingUp size={15} />
                      {savingsResult.monthlySavings > 0
                        ? "You have money remaining after expenses."
                        : "Your income and expenses are currently equal."}
                    </p>
                  )}
                </div>
              </section>

              <section className="calculator-card investment-calculator-card">
                <div className="calculator-heading">
                  <div className="calculator-heading-icon">
                    <TrendingUp size={23} />
                  </div>

                  <div>
                    <span className="tools-card-eyebrow">
                      LONG-TERM PLANNING
                    </span>
                    <h3>Investment Calculator</h3>
                  </div>
                </div>

                <p className="calculator-description">
                  Explore a hypothetical investment scenario using
                  your starting amount, regular contributions and
                  estimated annual return.
                </p>

                <div className="calculator-fields">
                  <label>
                    Initial investment ($)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={initialInvestment}
                      onChange={(event) =>
                        setInitialInvestment(event.target.value)
                      }
                      placeholder="e.g. 1000"
                    />
                  </label>

                  <label>
                    Monthly contribution ($)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      value={monthlyInvestment}
                      onChange={(event) =>
                        setMonthlyInvestment(event.target.value)
                      }
                      placeholder="e.g. 200"
                    />
                  </label>

                  <label>
                    Estimated annual return (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      inputMode="decimal"
                      value={annualReturn}
                      onChange={(event) =>
                        setAnnualReturn(event.target.value)
                      }
                      placeholder="e.g. 8"
                    />
                  </label>

                  <label>
                    Investment period (years)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      inputMode="numeric"
                      value={investmentYears}
                      onChange={(event) =>
                        setInvestmentYears(event.target.value)
                      }
                      placeholder="e.g. 10"
                    />
                  </label>
                </div>

                <div className="calculator-result" aria-live="polite">
                  <span>Estimated future value</span>

                  <strong>
                    {formatCurrency(investmentResult.futureValue)}
                  </strong>

                  <div className="investment-breakdown-bar">
                    <div
                      className="investment-principal-bar"
                      style={{
                        width: `${
                          100 - investmentResult.growthPercentage
                        }%`,
                      }}
                    />
                    <div
                      className="investment-growth-bar"
                      style={{
                        width: `${investmentResult.growthPercentage}%`,
                      }}
                    />
                  </div>

                  <div className="investment-legend">
                    <span>
                      <i className="investment-legend-principal" />
                      Contributions
                    </span>

                    <span>
                      <i className="investment-legend-growth" />
                      Estimated growth
                    </span>
                  </div>

                  <div className="calculator-breakdown">
                    <div>
                      <span>Total contributions</span>
                      <strong>
                        {formatCurrency(investmentResult.investedAmount)}
                      </strong>
                    </div>

                    <div>
                      <span>Estimated growth</span>
                      <strong>
                        {formatCurrency(investmentResult.estimatedGrowth)}
                      </strong>
                    </div>

                    <div>
                      <span>Investment duration</span>
                      <strong>{investmentResult.months} months</strong>
                    </div>
                  </div>
                </div>

                <p className="calculator-disclaimer">
                  Illustrative estimate only. Assumes a constant
                  annual return compounded monthly, with contributions
                  made at the end of each month. Actual returns vary.
                  Fees, taxes and inflation are excluded. This is not
                  financial advice.
                </p>
              </section>
            </div>

            <div className="calculator-actions">
              <p>
                <CircleDollarSign size={17} />
                Your calculations update automatically as you type.
              </p>

              <button
                type="button"
                className="calculator-reset-button"
                onClick={resetCalculators}
              >
                <RotateCcw size={16} />
                Reset Calculators
              </button>
            </div>
          </div>
        </section>

        <section className="tools-cta-section">
          <div className="container">
            <span className="section-eyebrow">KEEP LEARNING</span>

            <h2>Knowledge is your most valuable tool.</h2>

            <p>
              Explore more ideas and insights to help you make
              informed financial decisions.
            </p>

            <Link to="/blog" className="primary-button">
              Explore Financial Insights
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
