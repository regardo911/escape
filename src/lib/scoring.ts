import { copy } from "@/lib/copy";

export type AssessmentResponse = {
  spouseInCA: boolean;
  kidsInCA: boolean;
  kidsInCASchool: boolean;
  caHomeStatus: "primary" | "secondary" | "rent" | "none";
  primaryResidenceCA: boolean;
  employerInCA: boolean;
  inPersonInCA: boolean;
  caSourcedIncome: boolean;
  caLiquidityEvent: boolean;
  daysInCA: number;
  signals: {
    driversLicenseCA: boolean;
    voterRegistrationCA: boolean;
    primaryDoctorsCA: boolean;
    vehiclesRegisteredCA: boolean;
    bankingInCA: boolean;
  };
};

export type RiskDriver = {
  key: "family" | "residence" | "work" | "time" | "signals";
  points: number;
  explanation: string;
};

export type RiskResult = {
  score: number;
  verdict: string;
  drivers: RiskDriver[];
  translation: string;
};

const verdicts = [
  { max: 24, label: "LOW RISK — CA unlikely to claim you" },
  { max: 49, label: "GRAY ZONE — expect scrutiny" },
  { max: 74, label: "HIGH RISK — CA likely still claims you" },
  { max: 100, label: "VERY LIKELY CA RESIDENT" }
];

function clampScore(score: number) {
  return Math.min(Math.max(score, 0), 100);
}

export function scoreAssessment(response: AssessmentResponse): RiskResult {
  let familyPoints = 0;
  if (response.spouseInCA) familyPoints += 15;
  if (response.kidsInCA) familyPoints += 15;
  if (response.kidsInCASchool) familyPoints += 10;
  familyPoints = Math.min(familyPoints, 30);

  let residencePoints = 0;
  if (response.caHomeStatus === "primary") residencePoints += 20;
  if (response.caHomeStatus === "secondary") residencePoints += 12;
  if (response.caHomeStatus === "rent") residencePoints += 10;
  residencePoints = Math.min(residencePoints, 25);

  let workPoints = 0;
  if (response.employerInCA) workPoints += 10;
  if (response.inPersonInCA) workPoints += 10;
  if (response.caSourcedIncome) workPoints += 8;
  if (response.caLiquidityEvent) workPoints += 5;
  workPoints = Math.min(workPoints, 20);

  let timePoints = 0;
  if (response.daysInCA >= 183) timePoints = 15;
  else if (response.daysInCA >= 120) timePoints = 12;
  else if (response.daysInCA >= 90) timePoints = 8;
  else if (response.daysInCA >= 45) timePoints = 4;

  let signalPoints = 0;
  if (response.signals.driversLicenseCA) signalPoints += 3;
  if (response.signals.voterRegistrationCA) signalPoints += 3;
  if (response.signals.primaryDoctorsCA) signalPoints += 2;
  if (response.signals.vehiclesRegisteredCA) signalPoints += 2;
  if (response.signals.bankingInCA) signalPoints += 1;
  signalPoints = Math.min(signalPoints, 10);

  let score = familyPoints + residencePoints + workPoints + timePoints + signalPoints;

  if (response.spouseInCA || response.kidsInCA) {
    score = Math.max(score, 40);
  }
  if (response.primaryResidenceCA) {
    score = Math.max(score, 35);
  }

  score = clampScore(score);

  const drivers: RiskDriver[] = [];
  if (familyPoints > 0) {
    drivers.push({
      key: "family",
      points: familyPoints,
      explanation: copy.driverExplanations.family
    });
  }
  if (residencePoints > 0) {
    drivers.push({
      key: "residence",
      points: residencePoints,
      explanation: copy.driverExplanations.residence
    });
  }
  if (workPoints > 0) {
    drivers.push({
      key: "work",
      points: workPoints,
      explanation: copy.driverExplanations.work
    });
  }
  if (timePoints > 0) {
    drivers.push({
      key: "time",
      points: timePoints,
      explanation: copy.driverExplanations.time
    });
  }
  if (signalPoints > 0) {
    drivers.push({
      key: "signals",
      points: signalPoints,
      explanation: copy.driverExplanations.signals
    });
  }

  drivers.sort((a, b) => b.points - a.points);

  const verdict = verdicts.find((item) => score <= item.max)?.label ?? verdicts[3].label;

  return {
    score,
    verdict,
    drivers,
    translation: copy.results.uxTranslation
  };
}
