import { colorMappings } from "../../utils/colorMappings";
import { useResultSummary } from "./useResultSummary";

const ResultsSummary = () => {
  // Destructure data, averageScore, and loading state from the custom hook
  const { data, averageScore, loading } = useResultSummary();

  return (
    <div className="flex justify-center md:items-center min-h-screen font-hanken">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="md:flex md:h-[476px] md:w-[686px] bg-white md:rounded-[30px] rounded-b-[30px] md:shadow-[10px_10px_30px_14px_rgb(1_76_161_/_10%)] overflow-hidden mx-auto">
          <section className="bg-gradient-to-b from-light-slate-blue to-light-royal-blue text-white md:rounded-[30px] rounded-b-[30px] p-6 md:flex-1 flex justify-center flex-col items-center">
            <h1 className="text-lg mb-8 font-bold text-white/70">
              Your Result
            </h1>
            <div className="flex justify-center items-center flex-col w-[185px] h-[185px] rounded-full bg-gradient-to-b from-violet-blue to-persian-blue">
              <span className="text-6xl font-bold">{averageScore}</span>
              <span className="text-lg text-white/70">of 100</span>
            </div>
            <p className="text-center mb-2 mt-[26px] text-[29px] font-semibold">
              Great
            </p>
            <p className="text-center px-[28px] text-white/70">
              You scored higher than 65% of the people who have taken these
              tests.
            </p>
          </section>

          <section className="flex-1 p-[38px]">
            <h2 className="text-lg font-bold mb-7">Summary</h2>
            <div className="flex flex-col gap-3.5">
              {data.map((item) => {
                const { backgroundColor, textColor } =
                  colorMappings[item.category] || colorMappings["Visual"];
                return (
                  <div
                    key={item.category}
                    className="flex justify-between items-center p-3.5 rounded-md"
                    style={{
                      backgroundColor: backgroundColor,
                      color: textColor,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.icon}
                        alt={`${item.category} icon`}
                        className="w-5 h-5"
                      />
                      <span className="font-bold">{item.category}</span>
                    </div>
                    <div className="text-dark-gray-blue font-bold">
                      {item.score}
                      <span className="text-stone-gray"> / 100</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-[38px] w-full bg-gray-600 hover:bg-gradient-to-b from-light-slate-blue to-light-royal-blue text-white py-3 rounded-full font-bold">
              Continue
            </button>
          </section>
        </main>
      )}
    </div>
  );
};

export default ResultsSummary;
