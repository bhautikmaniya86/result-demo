import ResultsSummary from "../components/ResultsSummary/ResultsSummary";
import { useResultSummary } from "../components/ResultsSummary/useResultSummary";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

jest.mock("../components/ResultsSummary/useResultSummary");

describe("ResultsSummary Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test("displays loading message while data is loading", () => {
    (useResultSummary as jest.Mock).mockReturnValue({
      data: [],
      averageScore: 0,
      loading: true,
    });

    render(<ResultsSummary />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("calculates and displays the correct average score", async () => {
    const mockData = [
      { category: "Reaction", score: 80, icon: "reaction-icon.png" },
      { category: "Memory", score: 90, icon: "memory-icon.png" },
      { category: "Verbal", score: 70, icon: "verbal-icon.png" },
      { category: "Visual", score: 60, icon: "visual-icon.png" },
    ];

    const averageScore = Math.round(
      mockData.reduce((sum, item) => sum + item.score, 0) / mockData.length
    );

    (useResultSummary as jest.Mock).mockReturnValue({
      data: mockData,
      averageScore: averageScore,
      loading: false,
    });

    render(<ResultsSummary />);

    expect(screen.getByText(averageScore.toString())).toBeInTheDocument();
    expect(screen.getByText(/of 100/i)).toBeInTheDocument();
  });

  test("displays all categories and scores correctly", async () => {
    const mockData = [
      { category: "Reaction", score: 85, icon: "reaction-icon.png" },
      { category: "Memory", score: 90, icon: "memory-icon.png" },
      { category: "Verbal", score: 75, icon: "verbal-icon.png" },
      { category: "Visual", score: 80, icon: "visual-icon.png" },
    ];

    (useResultSummary as jest.Mock).mockReturnValue({
      data: mockData,
      averageScore: 82,
      loading: false,
    });

    render(<ResultsSummary />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.category)).toBeInTheDocument();
      expect(screen.getByText(`${item.score}`)).toBeInTheDocument();
      expect(screen.getByAltText(`${item.category} icon`)).toBeInTheDocument();
    });
  });
});
