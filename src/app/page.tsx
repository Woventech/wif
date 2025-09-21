"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type InvestmentType = {
  name: string;
  rate: number; // rendimento annuo %
};

const investments: InvestmentType[] = [
  { name: "ETF", rate: 0.07 },
  { name: "Azioni", rate: 0.1 },
  { name: "Obbligazioni", rate: 0.03 },
  { name: "Bilanciato", rate: 0.05 },
];

export default function Home() {
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(10);
  const [investment, setInvestment] = useState(investments[0]);

  // Calcolo valori
  const months = years * 12;
  let totalInvested = monthly * months;
  let balance = 0;
  const data: any[] = [];

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + investment.rate / 12) + monthly;
    if (m % 12 === 0) {
      data.push({
        year: m / 12,
        value: balance,
      });
    }
  }

  const netBalance = balance * (1 - 0.26); // netto dopo tasse

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Investimenti intelligenti</h1>
      <p className="mb-6">
        La finanza personale è fondamentale per costruire il proprio futuro.
        Qui puoi simulare come cresce un investimento nel tempo.
      </p>

      <div className="mb-6 flex flex-col gap-4">
        <label>
          Importo mensile (€):
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="ml-2 border px-2"
          />
        </label>
        <label>
          Periodo (anni):
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="ml-2 border px-2"
          />
        </label>
        <label>
          Tipo di investimento:
          <select
            value={investment.name}
            onChange={(e) =>
              setInvestment(
                investments.find((i) => i.name === e.target.value) || investments[0]
              )
            }
            className="ml-2 border px-2"
          >
            {investments.map((inv) => (
              <option key={inv.name}>{inv.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Simulazione crescita</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" label={{ value: "Anni", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4">
          <p>Totale versato: € {totalInvested.toFixed(2)}</p>
          <p>Totale finale: € {balance.toFixed(2)}</p>
          <p>Totale netto (dopo tasse 26%): € {netBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
