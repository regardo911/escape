"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import { copy } from "@/lib/copy";
import type { AssessmentResponse } from "@/lib/scoring";

const initialState: AssessmentResponse & {
  maritalStatus: string;
  spouseLocation: string;
  mortgageStatus: string;
  outOfStateResidence: string;
  daysOutsideCA: number;
  travelPattern: string;
  employerLocation: string;
  remoteVsOffice: string;
  licenseState: string;
  voterRegistration: string;
  primaryDoctorsLocation: string;
  vehicleRegistration: string;
  bankingLocation: string;
} = {
  maritalStatus: "",
  spouseLocation: "",
  kidsInCA: false,
  kidsInCASchool: false,
  spouseInCA: false,
  caHomeStatus: "none",
  primaryResidenceCA: false,
  mortgageStatus: "",
  outOfStateResidence: "",
  daysInCA: 0,
  daysOutsideCA: 0,
  travelPattern: "",
  employerLocation: "",
  remoteVsOffice: "",
  employerInCA: false,
  inPersonInCA: false,
  caSourcedIncome: false,
  caLiquidityEvent: false,
  licenseState: "",
  voterRegistration: "",
  primaryDoctorsLocation: "",
  vehicleRegistration: "",
  bankingLocation: "",
  signals: {
    driversLicenseCA: false,
    voterRegistrationCA: false,
    primaryDoctorsCA: false,
    vehiclesRegisteredCA: false,
    bankingInCA: false
  }
};

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const section = copy.assessment.sections[step];

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateSignals = <K extends keyof AssessmentResponse["signals"]>(
    key: K,
    value: AssessmentResponse["signals"][K]
  ) => {
    setForm((prev) => ({ ...prev, signals: { ...prev.signals, [key]: value } }));
  };

  const next = () => setStep((prev) => Math.min(prev + 1, copy.assessment.sections.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    const payload: AssessmentResponse = {
      spouseInCA: form.spouseInCA,
      kidsInCA: form.kidsInCA,
      kidsInCASchool: form.kidsInCASchool,
      caHomeStatus: form.caHomeStatus,
      primaryResidenceCA: form.primaryResidenceCA,
      employerInCA: form.employerInCA,
      inPersonInCA: form.inPersonInCA,
      caSourcedIncome: form.caSourcedIncome,
      caLiquidityEvent: form.caLiquidityEvent,
      daysInCA: form.daysInCA,
      signals: form.signals
    };

    const response = await fetch("/api/assessments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { id: string };
    router.push(`/results/${data.id}`);
  };

  return (
    <div className="space-y-8">
      <Card className="space-y-6">
        <SectionHeader eyebrow={section.name} title={section.title} description={section.helper} />
        <div className="grid gap-4 md:grid-cols-2">
          {step === 0 && (
            <>
              <label className="space-y-2 text-sm">
                <span>{section.questions[0]}</span>
                <input
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.maritalStatus}
                  onChange={(event) => update("maritalStatus", event.target.value)}
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[1]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.spouseLocation}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("spouseLocation", value);
                    update("spouseInCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[2]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.kidsInCA ? "Yes" : "No"}
                  onChange={(event) => update("kidsInCA", event.target.value === "Yes")}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[3]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.kidsInCASchool ? "Yes" : "No"}
                  onChange={(event) => update("kidsInCASchool", event.target.value === "Yes")}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </>
          )}

          {step === 1 && (
            <>
              <label className="space-y-2 text-sm">
                <span>{section.questions[0]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.caHomeStatus}
                  onChange={(event) => {
                    const value = event.target.value as AssessmentResponse["caHomeStatus"];
                    update("caHomeStatus", value);
                    update("primaryResidenceCA", value === "primary");
                  }}
                >
                  <option value="none">None</option>
                  <option value="rent">Rent</option>
                  <option value="secondary">Own (secondary)</option>
                  <option value="primary">Own (primary)</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[1]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.primaryResidenceCA ? "Primary in CA" : "Not primary in CA"}
                  onChange={(event) => update("primaryResidenceCA", event.target.value === "Primary in CA")}
                >
                  <option value="Not primary in CA">Not primary in CA</option>
                  <option value="Primary in CA">Primary in CA</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[2]}</span>
                <input
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.mortgageStatus}
                  onChange={(event) => update("mortgageStatus", event.target.value)}
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[3]}</span>
                <input
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.outOfStateResidence}
                  onChange={(event) => update("outOfStateResidence", event.target.value)}
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <label className="space-y-2 text-sm">
                <span>{section.questions[0]}</span>
                <input
                  type="number"
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.daysInCA}
                  onChange={(event) => update("daysInCA", Number(event.target.value))}
                />
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[1]}</span>
                <input
                  type="number"
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.daysOutsideCA}
                  onChange={(event) => update("daysOutsideCA", Number(event.target.value))}
                />
              </label>
              <label className="space-y-2 text-sm md:col-span-2">
                <span>{section.questions[2]}</span>
                <input
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.travelPattern}
                  onChange={(event) => update("travelPattern", event.target.value)}
                />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <label className="space-y-2 text-sm">
                <span>{section.questions[0]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.employerLocation}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("employerLocation", value);
                    update("employerInCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[1]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.remoteVsOffice}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("remoteVsOffice", value);
                    update("inPersonInCA", value === "In-person in CA");
                  }}
                >
                  <option value="">Select</option>
                  <option value="Remote">Remote</option>
                  <option value="In-person in CA">In-person in CA</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[2]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.caSourcedIncome ? "Yes" : "No"}
                  onChange={(event) => update("caSourcedIncome", event.target.value === "Yes")}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[3]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.caLiquidityEvent ? "Yes" : "No"}
                  onChange={(event) => update("caLiquidityEvent", event.target.value === "Yes")}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </>
          )}

          {step === 4 && (
            <>
              <label className="space-y-2 text-sm">
                <span>{section.questions[0]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.licenseState}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("licenseState", value);
                    updateSignals("driversLicenseCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[1]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.voterRegistration}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("voterRegistration", value);
                    updateSignals("voterRegistrationCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[2]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.primaryDoctorsLocation}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("primaryDoctorsLocation", value);
                    updateSignals("primaryDoctorsCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm">
                <span>{section.questions[3]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.vehicleRegistration}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("vehicleRegistration", value);
                    updateSignals("vehiclesRegisteredCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
              <label className="space-y-2 text-sm md:col-span-2">
                <span>{section.questions[4]}</span>
                <select
                  className="w-full rounded-xl border border-ink-900/10 px-3 py-2"
                  value={form.bankingLocation}
                  onChange={(event) => {
                    const value = event.target.value;
                    update("bankingLocation", value);
                    updateSignals("bankingInCA", value === "California");
                  }}
                >
                  <option value="">Select</option>
                  <option value="California">California</option>
                  <option value="Not California">Not California</option>
                </select>
              </label>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          )}
          {step < copy.assessment.sections.length - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting" : "See Results"}
            </Button>
          )}
        </div>
      </Card>

      <Card className="space-y-3 text-sm text-ink-700">
        <p>{copy.disclaimer}</p>
      </Card>
    </div>
  );
}
