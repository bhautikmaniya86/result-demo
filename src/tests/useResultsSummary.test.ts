import { renderHook, waitFor } from "@testing-library/react";
import { useResultSummary } from "../components/ResultsSummary/useResultSummary";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useResultSummary", () => {
  test("initially sets loading to true", () => {
    const { result } = renderHook(() => useResultSummary());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.averageScore).toBe(0);
  });

  test("fetches data successfully and calculates average score", async () => {
    const mockData = [
      { category: "Reaction", score: 80, icon: "reaction-icon.png" },
      { category: "Memory", score: 90, icon: "memory-icon.png" },
      { category: "Verbal", score: 75, icon: "verbal-icon.png" },
      { category: "Visual", score: 85, icon: "visual-icon.png" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const { result } = renderHook(() => useResultSummary());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledWith("/data.json");
    expect(result.current.data).toEqual(mockData);
    expect(result.current.averageScore).toBe(
      Math.round((80 + 90 + 75 + 85) / 4)
    );
    expect(result.current.loading).toBe(false);
  });

  test("handles fetch error gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => useResultSummary());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledWith("/data.json");
    expect(result.current.data).toEqual([]);
    expect(result.current.averageScore).toBe(0);
    expect(result.current.loading).toBe(false);

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
  });

  test("handles empty data gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    const { result } = renderHook(() => useResultSummary());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledWith("/data.json");
    expect(result.current.data).toEqual([]);
    expect(result.current.averageScore).toBe(0);
    expect(result.current.loading).toBe(false);
  });
});
