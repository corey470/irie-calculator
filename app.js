const form = document.querySelector("#calculatorForm");
const teslaPreset = document.querySelector("#teslaPreset");
const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector("#primaryNav");
const navLinks = Array.from(document.querySelectorAll(".primary-nav a, .brand, .header-cta"));
const pageViews = Array.from(document.querySelectorAll(".page-view"));
const calculatorSeries = document.querySelector(".calculator-series-grid");
const shareButtons = Array.from(document.querySelectorAll(".share-trigger"));
const shareStatus = document.querySelector("#shareStatus");
const zipCode = document.querySelector("#zipCode");
const applyZipDefaults = document.querySelector("#applyZipDefaults");
const inputTabs = Array.from(document.querySelectorAll(".input-tab"));
const inputSections = Array.from(document.querySelectorAll(".input-section"));

const fuelIds = ["fuelMiles", "fuelMpg", "fuelPrice"];
const everydayIds = [
  "homePrice",
  "homeDownPct",
  "homeRate",
  "homeTerm",
  "homeTaxPct",
  "homeInsHoa",
  "rentIncome",
  "rentDebt",
  "rentUtilities",
  "rentMonthly",
  "rentBuyYears",
  "rentIncrease",
  "debtOneBalance",
  "debtOneApr",
  "debtOneMin",
  "debtTwoBalance",
  "debtTwoApr",
  "debtExtra",
  "simpleLoanAmount",
  "simpleLoanRate",
  "simpleLoanTerm",
  "emergencyBills",
  "emergencyMonths",
  "emergencySaved",
  "commuteMiles",
  "commuteDays",
  "commuteMpg",
  "commuteGas",
  "commuteFees",
  "commuteBetterMpg",
  "roadTripMiles",
  "roadTripMpg",
  "roadTripGas",
  "roadTripFees",
  "roadTripNights",
  "roadTripHotel",
  "shopAPrice",
  "shopAUnits",
  "shopBPrice",
  "shopBUnits",
  "shopCoupon",
  "shopTax",
  "groceryPeople",
  "groceryTrips",
  "groceryBasket",
  "groceryCoupon",
  "mealsReplaced",
  "mealOutCost",
  "tripFlight",
  "tripTravelers",
  "tripAirFees",
  "tripNights",
  "tripHotel",
  "tripFood",
];
const ids = [
  "msrp",
  "price",
  "taxRate",
  "fees",
  "leaseTerm",
  "residualPct",
  "moneyFactor",
  "quotedLeasePayment",
  "leaseIncentives",
  "leaseDown",
  "acquisitionFee",
  "dispositionFee",
  "financeTerm",
  "apr",
  "financeIncentives",
  "financeDown",
  "resalePct",
  "annualMiles",
  "allowedMiles",
  "overageRate",
  "maintenance",
];

const fields = Object.fromEntries(ids.map((id) => [id, document.querySelector(`#${id}`)]));
const fuelFields = Object.fromEntries(fuelIds.map((id) => [id, document.querySelector(`#${id}`)]));
const everydayFields = Object.fromEntries(everydayIds.map((id) => [id, document.querySelector(`#${id}`)]));
const shareableFields = { ...fields, ...fuelFields, ...everydayFields };

const output = {
  recommendation: document.querySelector("#recommendation"),
  dealBadge: document.querySelector("#dealBadge"),
  leasePayment: document.querySelector("#leasePayment"),
  financePayment: document.querySelector("#financePayment"),
  leaseApr: document.querySelector("#leaseApr"),
  loanAmount: document.querySelector("#loanAmount"),
  leaseCash: document.querySelector("#leaseCash"),
  financeCash: document.querySelector("#financeCash"),
  leaseExtras: document.querySelector("#leaseExtras"),
  financeEquity: document.querySelector("#financeEquity"),
  leaseNet: document.querySelector("#leaseNet"),
  financeNet: document.querySelector("#financeNet"),
  insights: document.querySelector("#insights"),
  autoMeaning: document.querySelector("#autoMeaning"),
  leaseScore: document.querySelector("#leaseScore"),
  effectiveApr: document.querySelector("#effectiveApr"),
  breakEven: document.querySelector("#breakEven"),
  ruleStatus: document.querySelector("#ruleStatus"),
  zeroDown: document.querySelector("#zeroDown"),
  leaseBuyout: document.querySelector("#leaseBuyout"),
  fuelCost: document.querySelector("#fuelCost"),
  homeMonthly: document.querySelector("#homeMonthly"),
  homeLoan: document.querySelector("#homeLoan"),
  homeIncome: document.querySelector("#homeIncome"),
  homeCash: document.querySelector("#homeCash"),
  rentMax: document.querySelector("#rentMax"),
  rentSafe: document.querySelector("#rentSafe"),
  rentLeft: document.querySelector("#rentLeft"),
  rentMoveIn: document.querySelector("#rentMoveIn"),
  rentBuyWinner: document.querySelector("#rentBuyWinner"),
  rentTotal: document.querySelector("#rentTotal"),
  buyTotal: document.querySelector("#buyTotal"),
  rentBuyGap: document.querySelector("#rentBuyGap"),
  homeMeaning: document.querySelector("#homeMeaning"),
  debtMonths: document.querySelector("#debtMonths"),
  debtInterest: document.querySelector("#debtInterest"),
  debtTarget: document.querySelector("#debtTarget"),
  debtGap: document.querySelector("#debtGap"),
  financeMeaning: document.querySelector("#financeMeaning"),
  simpleLoanPayment: document.querySelector("#simpleLoanPayment"),
  simpleLoanTotal: document.querySelector("#simpleLoanTotal"),
  simpleLoanInterest: document.querySelector("#simpleLoanInterest"),
  simpleLoanDate: document.querySelector("#simpleLoanDate"),
  emergencyGoal: document.querySelector("#emergencyGoal"),
  emergencyGap: document.querySelector("#emergencyGap"),
  emergencyPace: document.querySelector("#emergencyPace"),
  emergencyStatus: document.querySelector("#emergencyStatus"),
  commuteMonthly: document.querySelector("#commuteMonthly"),
  commuteAnnual: document.querySelector("#commuteAnnual"),
  commutePerMile: document.querySelector("#commutePerMile"),
  commuteSavings: document.querySelector("#commuteSavings"),
  fuelMeaning: document.querySelector("#fuelMeaning"),
  roadTripTotal: document.querySelector("#roadTripTotal"),
  roadTripFuel: document.querySelector("#roadTripFuel"),
  roadTripStay: document.querySelector("#roadTripStay"),
  roadTripPerMile: document.querySelector("#roadTripPerMile"),
  shoppingWinner: document.querySelector("#shoppingWinner"),
  shopAUnit: document.querySelector("#shopAUnit"),
  shopBUnit: document.querySelector("#shopBUnit"),
  shopSavings: document.querySelector("#shopSavings"),
  shoppingMeaning: document.querySelector("#shoppingMeaning"),
  groceryMonthly: document.querySelector("#groceryMonthly"),
  groceryPerPerson: document.querySelector("#groceryPerPerson"),
  grocerySaved: document.querySelector("#grocerySaved"),
  mealSavings: document.querySelector("#mealSavings"),
  tripTotal: document.querySelector("#tripTotal"),
  tripAirTotal: document.querySelector("#tripAirTotal"),
  tripStayFood: document.querySelector("#tripStayFood"),
  tripDaily: document.querySelector("#tripDaily"),
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const monthlyMoney = (value) => `${money.format(value)}/mo`;
const pct = (value, digits = 1) => `${value.toFixed(digits)}%`;
const setField = (id, nextValue) => {
  const field = shareableFields[id];
  if (field) field.value = nextValue;
};

const regionalDefaults = {
  0: { taxRate: 6.6, homeTaxPct: 1.8, homeInsHoa: 430, rentMonthly: 2600, commuteGas: 3.35 },
  1: { taxRate: 6.3, homeTaxPct: 1.7, homeInsHoa: 410, rentMonthly: 2400, commuteGas: 3.35 },
  2: { taxRate: 5.8, homeTaxPct: 0.9, homeInsHoa: 330, rentMonthly: 2100, commuteGas: 3.25 },
  3: { taxRate: 6.5, homeTaxPct: 0.9, homeInsHoa: 320, rentMonthly: 2100, commuteGas: 3.45 },
  4: { taxRate: 6.0, homeTaxPct: 1.4, homeInsHoa: 300, rentMonthly: 1600, commuteGas: 3.25 },
  5: { taxRate: 6.8, homeTaxPct: 1.2, homeInsHoa: 310, rentMonthly: 1500, commuteGas: 3.20 },
  6: { taxRate: 7.4, homeTaxPct: 1.9, homeInsHoa: 330, rentMonthly: 1700, commuteGas: 3.35 },
  7: { taxRate: 7.1, homeTaxPct: 1.7, homeInsHoa: 360, rentMonthly: 1700, commuteGas: 3.10 },
  8: { taxRate: 7.2, homeTaxPct: 0.8, homeInsHoa: 280, rentMonthly: 1800, commuteGas: 3.60 },
  9: { taxRate: 8.4, homeTaxPct: 0.8, homeInsHoa: 390, rentMonthly: 2800, commuteGas: 4.85 },
};

function syncCompactHeader() {
  const viewportWidth = window.visualViewport?.width || window.innerWidth;
  siteHeader.classList.toggle("compact-header", viewportWidth <= 960);
  if (viewportWidth > 960) {
    setMenuOpen(false);
  }
}

function currentPage() {
  const page = window.location.hash.replace("#", "");
  return ["auto", "home", "finance", "fuel", "shopping"].includes(page) ? page : "auto";
}

function showPage(page) {
  calculatorSeries.hidden = page === "auto";
  pageViews.forEach((view) => {
    view.hidden = view.dataset.page !== page;
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${page}`;
    link.classList.toggle("active-page", isActive);
    if (link.classList.contains("primary-nav") || link.closest(".primary-nav")) {
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
    if (link.classList.contains("header-cta")) {
      link.textContent = page === "auto" ? "Auto" : "Back to Auto";
    }
  });

  window.scrollTo({ top: 0, behavior: "auto" });
}

function showInputPanel(panelId) {
  inputTabs.forEach((tab) => {
    const isActive = tab.dataset.panel === panelId;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  inputSections.forEach((section) => {
    const isActive = section.dataset.panel === panelId;
    section.classList.toggle("active", isActive);
    section.hidden = !isActive;
  });
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  params.forEach((nextValue, id) => {
    if (id === "zip") {
      zipCode.value = nextValue;
      return;
    }
    setField(id, nextValue);
  });
}

function buildShareUrl() {
  const params = new URLSearchParams();
  Object.entries(shareableFields).forEach(([id, field]) => {
    if (field?.value !== undefined && field.value !== "") {
      params.set(id, field.value);
    }
  });
  if (zipCode.value.trim()) params.set("zip", zipCode.value.trim());
  const url = new URL(window.location.href);
  url.search = params.toString();
  url.hash = currentPage();
  return url.toString();
}

async function shareCurrentSetup() {
  const url = buildShareUrl();
  window.history.replaceState(null, "", url);
  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = "Share link copied with this calculator and inputs saved.";
  } catch {
    shareStatus.textContent = url;
  }
}

function applyRegionalDefaults() {
  const zip = zipCode.value.trim();
  const region = regionalDefaults[zip[0]];
  if (!region) {
    shareStatus.textContent = "Enter a 5-digit U.S. ZIP to apply starter defaults.";
    return;
  }

  Object.entries(region).forEach(([id, nextValue]) => setField(id, nextValue));
  setField("fuelPrice", region.commuteGas);
  setField("roadTripGas", region.commuteGas);
  shareStatus.textContent = `Applied starter defaults for ZIP ${zip}. These are estimates, not live local quotes.`;
  calculate();
  calculateFuelCost();
  calculateEveryday();
}

function value(id) {
  return Number.parseFloat(fields[id].value) || 0;
}

function fuelValue(id) {
  return Number.parseFloat(fuelFields[id].value) || 0;
}

function everydayValue(id) {
  return Number.parseFloat(everydayFields[id].value) || 0;
}

function loanPayment(principal, annualRate, months) {
  if (months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

function remainingBalance(principal, annualRate, payment, monthsPaid) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthsPaid <= 0) return principal;
  if (monthlyRate === 0) return Math.max(0, principal - payment * monthsPaid);
  const grownPrincipal = principal * (1 + monthlyRate) ** monthsPaid;
  const paidDown = payment * (((1 + monthlyRate) ** monthsPaid - 1) / monthlyRate);
  return Math.max(0, grownPrincipal - paidDown);
}

function classifyLeaseScore(score) {
  if (score <= 1) return ["Amazing", "good"];
  if (score <= 1.25) return ["Great", "good"];
  if (score <= 1.5) return ["Good", "warning"];
  if (score <= 1.85) return ["Fair", "warning"];
  return ["Pricey", "bad"];
}

function updateBadge(text, tone) {
  output.dealBadge.textContent = text;
  output.dealBadge.className = `badge ${tone === "good" ? "" : tone}`.trim();
}

function addInsight(text) {
  const item = document.createElement("li");
  item.textContent = text;
  output.insights.appendChild(item);
}

function calculate() {
  const msrp = value("msrp");
  const price = value("price");
  const taxRate = value("taxRate") / 100;
  const fees = value("fees");
  const leaseTerm = Math.max(1, value("leaseTerm"));
  const residualValue = msrp * (value("residualPct") / 100);
  const moneyFactor = value("moneyFactor");
  const quotedLeasePayment = value("quotedLeasePayment");
  const leaseIncentives = value("leaseIncentives");
  const leaseDown = value("leaseDown");
  const acquisitionFee = value("acquisitionFee");
  const dispositionFee = value("dispositionFee");
  const financeTerm = Math.max(1, value("financeTerm"));
  const apr = value("apr");
  const financeIncentives = value("financeIncentives");
  const financeDown = value("financeDown");
  const resaleValue = msrp * (value("resalePct") / 100);
  const annualMiles = value("annualMiles");
  const allowedMiles = value("allowedMiles");
  const overageRate = value("overageRate");
  const maintenance = value("maintenance");

  const leaseCapCost = Math.max(0, price + acquisitionFee - leaseIncentives - leaseDown);
  const depreciationCharge = (leaseCapCost - residualValue) / leaseTerm;
  const rentCharge = (leaseCapCost + residualValue) * moneyFactor;
  const baseLeasePayment = Math.max(0, depreciationCharge + rentCharge);
  const leasePaymentBeforeTax = quotedLeasePayment > 0 ? quotedLeasePayment : baseLeasePayment;
  const leasePayment = leasePaymentBeforeTax * (1 + taxRate);
  const leaseAprEquivalent = moneyFactor * 2400;

  const milesOver = Math.max(0, (annualMiles - allowedMiles) * (leaseTerm / 12));
  const mileageCharge = milesOver * overageRate;
  const leaseExtras = mileageCharge + dispositionFee;
  const leaseCashOut = leaseDown + fees + leasePayment * leaseTerm;
  const leaseNet = leaseCashOut + leaseExtras;
  const zeroDownEquivalent = leasePayment + (leaseDown + fees) / leaseTerm;

  const financeTax = price * taxRate;
  const financedAmount = Math.max(0, price + financeTax + fees - financeIncentives - financeDown);
  const financePayment = loanPayment(financedAmount, apr, financeTerm);
  const compareMonths = Math.min(leaseTerm, financeTerm);
  const balance = remainingBalance(financedAmount, apr, financePayment, compareMonths);
  const equity = resaleValue - balance;
  const financeCashOut = financeDown + financePayment * compareMonths + maintenance * compareMonths;
  const financeNet = financeCashOut - equity;

  const leaseScore = msrp > 0 ? (leasePaymentBeforeTax / msrp) * 100 : 0;
  const [scoreLabel, scoreTone] = classifyLeaseScore(leaseScore);
  const delta = Math.abs(leaseNet - financeNet);
  const leaseWins = leaseNet < financeNet;
  const monthlyBreakEven = (financeNet - leaseExtras - leaseDown - fees) / leaseTerm;

  output.leasePayment.textContent = monthlyMoney(leasePayment);
  output.financePayment.textContent = monthlyMoney(financePayment);
  output.leaseApr.textContent = `Advanced lease rate: ${pct(leaseAprEquivalent, 2)}`;
  output.loanAmount.textContent = `${money.format(financedAmount)} financed`;
  output.leaseCash.textContent = money.format(leaseCashOut);
  output.financeCash.textContent = money.format(financeCashOut);
  output.leaseExtras.textContent = money.format(leaseExtras);
  output.financeEquity.textContent = money.format(equity);
  output.leaseNet.textContent = money.format(leaseNet);
  output.financeNet.textContent = money.format(financeNet);
  output.leaseScore.textContent = pct(leaseScore, 2);
  output.effectiveApr.textContent = pct(leaseAprEquivalent, 2);
  output.breakEven.textContent = monthlyMoney(Math.max(0, monthlyBreakEven));
  output.zeroDown.textContent = monthlyMoney(zeroDownEquivalent);
  output.ruleStatus.textContent = leaseScore <= 1.25 ? "Passes" : "Fails";
  output.leaseBuyout.textContent = money.format(residualValue);

  output.recommendation.textContent = leaseWins ? "Lease is ahead" : "Finance is ahead";
  output.autoMeaning.textContent = leaseWins
    ? `Leasing is ahead by ${money.format(delta)} over the same ${leaseTerm}-month window.`
    : `Buying is ahead by ${money.format(delta)} after estimated resale value.`;
  updateBadge(scoreLabel, scoreTone);

  output.insights.replaceChildren();

  if (leaseWins) {
    addInsight(`Leasing looks cheaper by ${money.format(delta)} over ${leaseTerm} months with these numbers.`);
  } else {
    addInsight(`Financing looks cheaper by ${money.format(delta)} over ${leaseTerm} months after estimated resale value.`);
  }

  if (quotedLeasePayment > 0) {
    addInsight(`Using the monthly payment you entered: ${monthlyMoney(quotedLeasePayment)} before tax.`);
  }

  if (leaseScore <= 1.25) {
    addInsight(`The lease score is ${pct(leaseScore, 2)} of MSRP, which passes the 1.25% rule from the video.`);
  } else {
    addInsight(`The lease score is ${pct(leaseScore, 2)} of MSRP, above the 1.25% rule threshold.`);
  }

  addInsight(`If you rolled the money due at signing into the lease, it would feel close to ${monthlyMoney(zeroDownEquivalent)}.`);

  if (leaseAprEquivalent > apr + 1) {
    addInsight(`The lease's hidden rate is about ${pct(leaseAprEquivalent, 2)}, which is higher than the loan rate.`);
  } else if (leaseAprEquivalent + 1 < apr) {
    addInsight("The lease rate looks better than the loan rate before equity and fees.");
  } else {
    addInsight("The lease rate and loan rate are close, so price, fees, miles, and resale value decide this.");
  }

  if (milesOver > 0) {
    addInsight(`Your miles could add about ${money.format(mileageCharge)} in lease penalties.`);
  } else {
    addInsight("Your miles fit inside the lease allowance.");
  }

  if (equity > 0) {
    addInsight(`Buying could leave about ${money.format(equity)} in car value after ${compareMonths} months.`);
  } else {
    addInsight(`Buying could leave about ${money.format(Math.abs(equity))} more owed than the car is worth after ${compareMonths} months.`);
  }
}

function calculateFuelCost() {
  const miles = fuelValue("fuelMiles");
  const mpg = fuelValue("fuelMpg");
  const price = fuelValue("fuelPrice");
  const monthlyFuelCost = mpg > 0 ? (miles / mpg) * price : 0;

  output.fuelCost.textContent = monthlyMoney(monthlyFuelCost);
}

function simulateDebtPayoff(sourceDebts, strategy, extraPayment) {
  const debts = sourceDebts
    .filter((debt) => debt.balance > 0)
    .map((debt) => ({ ...debt }));
  if (debts.length === 0) return { months: 0, interest: 0, firstTarget: "Paid" };

  let months = 0;
  let interest = 0;
  const basePayment = debts.reduce((sum, debt) => sum + debt.minimum, 0) + extraPayment;
  const firstTargetDebt = [...debts].sort((a, b) => {
    if (strategy === "snowball") return a.balance - b.balance;
    return b.apr - a.apr;
  })[0];
  const firstTarget = firstTargetDebt.name;

  while (debts.some((debt) => debt.balance > 0) && months < 600) {
    months += 1;
    let available = basePayment;

    debts.forEach((debt) => {
      if (debt.balance <= 0) return;
      const monthlyInterest = debt.balance * (debt.apr / 100 / 12);
      debt.balance += monthlyInterest;
      interest += monthlyInterest;
    });

    debts.forEach((debt) => {
      if (debt.balance <= 0) return;
      const payment = Math.min(debt.minimum, debt.balance, available);
      debt.balance -= payment;
      available -= payment;
    });

    while (available > 0.01 && debts.some((debt) => debt.balance > 0)) {
      const target = debts
        .filter((debt) => debt.balance > 0)
        .sort((a, b) => {
          if (strategy === "snowball") return a.balance - b.balance;
          return b.apr - a.apr;
        })[0];
      const payment = Math.min(target.balance, available);
      target.balance -= payment;
      available -= payment;
    }

    if (debts.every((debt) => debt.balance <= 0.01)) break;
  }

  return { months, interest, firstTarget };
}

function calculateEveryday() {
  const homePrice = everydayValue("homePrice");
  const homeDown = homePrice * (everydayValue("homeDownPct") / 100);
  const homeLoan = Math.max(0, homePrice - homeDown);
  const homePayment = loanPayment(homeLoan, everydayValue("homeRate"), everydayValue("homeTerm") * 12);
  const propertyTax = (homePrice * (everydayValue("homeTaxPct") / 100)) / 12;
  const pmi = everydayValue("homeDownPct") < 20 ? homeLoan * 0.0065 / 12 : 0;
  const homeMonthly = homePayment + propertyTax + everydayValue("homeInsHoa") + pmi;
  output.homeMonthly.textContent = monthlyMoney(homeMonthly);
  output.homeLoan.textContent = money.format(homeLoan);
  output.homeIncome.textContent = monthlyMoney(homeMonthly / 0.28);
  output.homeCash.textContent = money.format(homeDown);

  const rentIncome = everydayValue("rentIncome");
  const rentDebt = everydayValue("rentDebt");
  const rentUtilities = everydayValue("rentUtilities");
  const rentMax = Math.max(0, rentIncome * 0.3 - rentDebt - rentUtilities);
  const rentLeft = rentIncome - everydayValue("rentMonthly") - rentDebt - rentUtilities;
  const moveInCash = everydayValue("rentMonthly") * 2 + rentUtilities;
  output.rentMax.textContent = monthlyMoney(rentMax);
  output.rentSafe.textContent = monthlyMoney(rentMax);
  output.rentLeft.textContent = monthlyMoney(rentLeft);
  output.rentMoveIn.textContent = money.format(moveInCash);

  const rentYears = everydayValue("rentBuyYears");
  const rentIncrease = everydayValue("rentIncrease") / 100;
  let rentTotal = 0;
  let currentRent = everydayValue("rentMonthly");
  for (let year = 0; year < rentYears; year += 1) {
    rentTotal += currentRent * 12;
    currentRent *= 1 + rentIncrease;
  }
  const buyCashCost = homeMonthly * rentYears * 12 + homeDown;
  const rentBuyGap = Math.abs(buyCashCost - rentTotal);
  output.rentBuyWinner.textContent = rentTotal <= buyCashCost ? "Rent lower" : "Buy lower";
  output.rentTotal.textContent = money.format(rentTotal);
  output.buyTotal.textContent = money.format(buyCashCost);
  output.rentBuyGap.textContent = money.format(rentBuyGap);
  output.homeMeaning.textContent = homeMonthly > rentMax && rentMax > 0
    ? "This home payment is above the safe rent-style housing target from your income."
    : "This gives a quick monthly housing estimate, including tax, insurance, HOA, and PMI when needed.";

  const minimumOne = everydayValue("debtOneMin");
  const debtExtra = everydayValue("debtExtra");
  const debts = [
    {
      name: "Card",
      balance: everydayValue("debtOneBalance"),
      apr: everydayValue("debtOneApr"),
      minimum: minimumOne,
    },
    {
      name: "Loan",
      balance: everydayValue("debtTwoBalance"),
      apr: everydayValue("debtTwoApr"),
      minimum: Math.max(25, minimumOne * 0.65),
    },
  ];
  const avalanche = simulateDebtPayoff(debts, "avalanche", debtExtra);
  const snowball = simulateDebtPayoff(debts, "snowball", debtExtra);
  output.debtMonths.textContent = avalanche.months >= 600 ? "600+ mo" : `${avalanche.months} mo`;
  output.debtInterest.textContent = money.format(avalanche.interest);
  output.debtTarget.textContent = avalanche.firstTarget;
  output.debtGap.textContent = money.format(Math.max(0, snowball.interest - avalanche.interest));
  output.financeMeaning.textContent = `At this pace, avalanche payoff clears the listed debt in ${output.debtMonths.textContent}.`;

  const simpleLoanAmount = everydayValue("simpleLoanAmount");
  const simpleLoanTerm = Math.max(1, everydayValue("simpleLoanTerm"));
  const simpleLoanPayment = loanPayment(simpleLoanAmount, everydayValue("simpleLoanRate"), simpleLoanTerm);
  const simpleLoanTotal = simpleLoanPayment * simpleLoanTerm;
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + simpleLoanTerm);
  output.simpleLoanPayment.textContent = monthlyMoney(simpleLoanPayment);
  output.simpleLoanTotal.textContent = money.format(simpleLoanTotal);
  output.simpleLoanInterest.textContent = money.format(Math.max(0, simpleLoanTotal - simpleLoanAmount));
  output.simpleLoanDate.textContent = payoffDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const emergencyGoal = everydayValue("emergencyBills") * everydayValue("emergencyMonths");
  const emergencyGap = Math.max(0, emergencyGoal - everydayValue("emergencySaved"));
  output.emergencyGoal.textContent = money.format(emergencyGoal);
  output.emergencyGap.textContent = money.format(emergencyGap);
  output.emergencyPace.textContent = emergencyGap > 0 ? `${Math.ceil(emergencyGap / 250)} mo` : "Done";
  output.emergencyStatus.textContent = emergencyGap <= 0 ? "Covered" : "Building";

  const commuteMiles = everydayValue("commuteMiles") * everydayValue("commuteDays");
  const commuteFuel = everydayValue("commuteMpg") > 0 ? (commuteMiles / everydayValue("commuteMpg")) * everydayValue("commuteGas") : 0;
  const commuteMonthly = commuteFuel + everydayValue("commuteFees");
  const betterFuel = everydayValue("commuteBetterMpg") > 0 ? (commuteMiles / everydayValue("commuteBetterMpg")) * everydayValue("commuteGas") : 0;
  output.commuteMonthly.textContent = monthlyMoney(commuteMonthly);
  output.commuteAnnual.textContent = money.format(commuteMonthly * 12);
  output.commutePerMile.textContent = commuteMiles > 0 ? `$${(commuteMonthly / commuteMiles).toFixed(2)}` : "$0.00";
  output.commuteSavings.textContent = monthlyMoney(Math.max(0, commuteFuel - betterFuel));
  output.fuelMeaning.textContent = `This commute costs about ${output.commuteMonthly.textContent}, or ${output.commuteAnnual.textContent} per year.`;

  const roadTripFuel = everydayValue("roadTripMpg") > 0 ? (everydayValue("roadTripMiles") / everydayValue("roadTripMpg")) * everydayValue("roadTripGas") : 0;
  const roadTripStay = everydayValue("roadTripNights") * everydayValue("roadTripHotel");
  const roadTripTotal = roadTripFuel + roadTripStay + everydayValue("roadTripFees");
  output.roadTripTotal.textContent = money.format(roadTripTotal);
  output.roadTripFuel.textContent = money.format(roadTripFuel);
  output.roadTripStay.textContent = money.format(roadTripStay);
  output.roadTripPerMile.textContent = everydayValue("roadTripMiles") > 0 ? `$${(roadTripTotal / everydayValue("roadTripMiles")).toFixed(2)}` : "$0.00";

  const couponFactor = 1 - everydayValue("shopCoupon") / 100;
  const taxFactor = 1 + everydayValue("shopTax") / 100;
  const aTotal = everydayValue("shopAPrice") * couponFactor * taxFactor;
  const bTotal = everydayValue("shopBPrice") * couponFactor * taxFactor;
  const aUnits = everydayValue("shopAUnits");
  const bUnits = everydayValue("shopBUnits");
  const aUnit = aUnits > 0 ? aTotal / aUnits : null;
  const bUnit = bUnits > 0 ? bTotal / bUnits : null;
  if (aUnit === null || bUnit === null) {
    output.shoppingWinner.textContent = "Add units";
    output.shopAUnit.textContent = aUnit === null ? "--" : `$${aUnit.toFixed(2)}`;
    output.shopBUnit.textContent = bUnit === null ? "--" : `$${bUnit.toFixed(2)}`;
    output.shopSavings.textContent = "--";
    output.shoppingMeaning.textContent = "Add the unit count for both options to compare the real shelf price.";
  } else {
    const unitSavings = Math.abs(aUnit - bUnit);
    output.shoppingWinner.textContent = aUnit === bUnit ? "Tie" : aUnit < bUnit ? "A wins" : "B wins";
    output.shopAUnit.textContent = `$${aUnit.toFixed(2)}`;
    output.shopBUnit.textContent = `$${bUnit.toFixed(2)}`;
    output.shopSavings.textContent = `$${unitSavings.toFixed(2)}/unit`;
    output.shoppingMeaning.textContent = `${output.shoppingWinner.textContent} by ${output.shopSavings.textContent}. This is the grocery shelf-label math.`;
  }

  const groceryGross = everydayValue("groceryTrips") * everydayValue("groceryBasket") * 4.33;
  const grocerySaved = groceryGross * (everydayValue("groceryCoupon") / 100);
  const groceryMonthly = Math.max(0, groceryGross - grocerySaved);
  const groceryPeople = Math.max(1, everydayValue("groceryPeople"));
  const mealSavings = everydayValue("mealsReplaced") * everydayValue("mealOutCost") * 4.33;
  output.groceryMonthly.textContent = monthlyMoney(groceryMonthly);
  output.groceryPerPerson.textContent = monthlyMoney(groceryMonthly / groceryPeople);
  output.grocerySaved.textContent = monthlyMoney(grocerySaved);
  output.mealSavings.textContent = monthlyMoney(mealSavings);

  const travelers = Math.max(1, everydayValue("tripTravelers"));
  const tripAirTotal = everydayValue("tripFlight") * travelers + everydayValue("tripAirFees");
  const tripStayFood = everydayValue("tripNights") * everydayValue("tripHotel") + everydayValue("tripFood") * travelers * Math.max(1, everydayValue("tripNights"));
  const tripTotal = tripAirTotal + tripStayFood;
  output.tripTotal.textContent = money.format(tripTotal);
  output.tripAirTotal.textContent = money.format(tripAirTotal);
  output.tripStayFood.textContent = money.format(tripStayFood);
  output.tripDaily.textContent = `${money.format(tripTotal / Math.max(1, everydayValue("tripNights")))}/day`;
}

function loadTeslaPreset() {
  const preset = {
    msrp: 38630,
    price: 38630,
    taxRate: 6.5,
    fees: 950,
    leaseTerm: 36,
    residualPct: 69.3,
    moneyFactor: 0.0012,
    quotedLeasePayment: 299,
    leaseIncentives: 0,
    leaseDown: 3000,
    acquisitionFee: 695,
    dispositionFee: 395,
    financeTerm: 72,
    apr: 5.99,
    financeIncentives: 0,
    financeDown: 3000,
    resalePct: 55,
    annualMiles: 10000,
    allowedMiles: 10000,
    overageRate: 0.25,
    maintenance: 15,
  };

  Object.entries(preset).forEach(([id, nextValue]) => {
    fields[id].value = nextValue;
  });

  calculate();
  window.location.hash = "auto";
  showPage("auto");
}

function setMenuOpen(isOpen) {
  siteHeader.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

form.addEventListener("input", calculate);
form.addEventListener("change", calculate);
Object.values(fuelFields).forEach((field) => {
  field.addEventListener("input", calculateFuelCost);
});
Object.values(everydayFields).forEach((field) => {
  field.addEventListener("input", calculateEveryday);
  field.addEventListener("change", calculateEveryday);
});
shareButtons.forEach((button) => {
  button.addEventListener("click", shareCurrentSetup);
});
applyZipDefaults.addEventListener("click", applyRegionalDefaults);
teslaPreset.addEventListener("click", loadTeslaPreset);
inputTabs.forEach((tab) => {
  tab.addEventListener("click", () => showInputPanel(tab.dataset.panel));
});
navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});
primaryNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});
window.addEventListener("resize", syncCompactHeader);
window.addEventListener("hashchange", () => showPage(currentPage()));
syncCompactHeader();
hydrateFromUrl();
showPage(currentPage());
showInputPanel("deal");
calculate();
calculateFuelCost();
calculateEveryday();
