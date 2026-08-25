export function monthlyHousingCost(input: {
  price: number; downPayment: number; rate: number; years: number; taxRate: number;
  annualInsurance: number; hoa: number; maintenanceRate: number;
}) {
  const principal = Math.max(0, input.price - input.downPayment);
  const payments = Math.max(1, input.years * 12);
  const monthlyRate = Math.max(0, input.rate) / 100 / 12;
  const mortgage = monthlyRate === 0
    ? principal / payments
    : principal * (monthlyRate * (1 + monthlyRate) ** payments) / ((1 + monthlyRate) ** payments - 1);
  const tax = input.price * (Math.max(0, input.taxRate) / 100) / 12;
  const insurance = Math.max(0, input.annualInsurance) / 12;
  const maintenance = input.price * (Math.max(0, input.maintenanceRate) / 100) / 12;
  return { mortgage, tax, insurance, hoa: Math.max(0, input.hoa), maintenance, total: mortgage + tax + insurance + Math.max(0, input.hoa) + maintenance };
}

export function sellerNet(input: { salePrice: number; payoff: number; transactionRate: number; concessions: number; repairs: number; closingCosts: number }) {
  const transactionCosts = input.salePrice * (input.transactionRate / 100);
  const net = input.salePrice - input.payoff - transactionCosts - input.concessions - input.repairs - input.closingCosts;
  return { net, transactionCosts };
}

export function compareOffer(input: { price: number; concessions: number; otherCosts: number; financing: string; contingencyDays: number; closeDays: number }) {
  const estimatedNet = input.price - input.concessions - input.otherCosts;
  const considerations = [
    input.financing === "cash" ? "No financing contingency stated" : `${input.financing} financing requires lender execution`,
    input.contingencyDays <= 10 ? "Short investigation window" : "Longer investigation window",
    input.closeDays <= 21 ? "Compressed close schedule" : "Conventional close schedule",
  ];
  return { estimatedNet, considerations };
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}
