import { describe, expect, it } from "vitest";
import { scoreAssessment, type AssessmentResponse } from "@/lib/scoring";

const baseResponse: AssessmentResponse = {
  spouseInCA: false,
  kidsInCA: false,
  kidsInCASchool: false,
  caHomeStatus: "none",
  primaryResidenceCA: false,
  employerInCA: false,
  inPersonInCA: false,
  caSourcedIncome: false,
  caLiquidityEvent: false,
  daysInCA: 0,
  signals: {
    driversLicenseCA: false,
    voterRegistrationCA: false,
    primaryDoctorsCA: false,
    vehiclesRegisteredCA: false,
    bankingInCA: false
  }
};

const withOverrides = (overrides: Partial<AssessmentResponse>): AssessmentResponse => ({
  ...baseResponse,
  ...overrides,
  signals: { ...baseResponse.signals, ...overrides.signals }
});

describe("scoreAssessment", () => {
  it("scores low risk when no CA anchors exist", () => {
    const result = scoreAssessment(baseResponse);
    expect(result.score).toBe(0);
    expect(result.verdict).toBe("LOW RISK — CA unlikely to claim you");
  });

  it("adds family points and applies family floor", () => {
    const result = scoreAssessment(withOverrides({ spouseInCA: true }));
    expect(result.score).toBe(40);
  });

  it("caps family points at 30", () => {
    const result = scoreAssessment(
      withOverrides({ spouseInCA: true, kidsInCA: true, kidsInCASchool: true })
    );
    expect(result.score).toBe(40);
  });

  it("scores primary residence points and applies floor", () => {
    const result = scoreAssessment(
      withOverrides({ caHomeStatus: "primary", primaryResidenceCA: true })
    );
    expect(result.score).toBe(35);
  });

  it("scores secondary residence points without floor", () => {
    const result = scoreAssessment(withOverrides({ caHomeStatus: "secondary" }));
    expect(result.score).toBe(12);
  });

  it("scores work and income anchors", () => {
    const result = scoreAssessment(
      withOverrides({
        employerInCA: true,
        inPersonInCA: true,
        caSourcedIncome: true,
        caLiquidityEvent: true
      })
    );
    expect(result.score).toBe(20);
  });

  it("scores time bands correctly", () => {
    const result = scoreAssessment(withOverrides({ daysInCA: 130 }));
    expect(result.score).toBe(12);
  });

  it("scores signals up to cap", () => {
    const result = scoreAssessment(
      withOverrides({
        signals: {
          driversLicenseCA: true,
          voterRegistrationCA: true,
          primaryDoctorsCA: true,
          vehiclesRegisteredCA: true,
          bankingInCA: true
        }
      })
    );
    expect(result.score).toBe(10);
  });

  it("applies both floors when applicable", () => {
    const result = scoreAssessment(
      withOverrides({
        spouseInCA: true,
        caHomeStatus: "primary",
        primaryResidenceCA: true
      })
    );
    expect(result.score).toBe(40);
  });

  it("clamps score at 100", () => {
    const result = scoreAssessment(
      withOverrides({
        spouseInCA: true,
        kidsInCA: true,
        kidsInCASchool: true,
        caHomeStatus: "primary",
        primaryResidenceCA: true,
        employerInCA: true,
        inPersonInCA: true,
        caSourcedIncome: true,
        caLiquidityEvent: true,
        daysInCA: 200,
        signals: {
          driversLicenseCA: true,
          voterRegistrationCA: true,
          primaryDoctorsCA: true,
          vehiclesRegisteredCA: true,
          bankingInCA: true
        }
      })
    );
    expect(result.score).toBe(100);
  });

  it("returns sorted drivers", () => {
    const result = scoreAssessment(
      withOverrides({
        spouseInCA: true,
        caHomeStatus: "secondary",
        daysInCA: 90
      })
    );
    expect(result.drivers[0].points).toBeGreaterThanOrEqual(result.drivers[1].points);
  });
});
