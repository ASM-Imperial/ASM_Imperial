import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2016, rugs: 50, milestone: "Company founded in Lalitpur" },
  { year: 2018, rugs: 300, milestone: "Expanded artisan team & local recognition" },
  { year: 2020, rugs: 700, milestone: "Collaborations with international designers" },
  { year: 2023, rugs: 1200, milestone: "Global exports to USA, Europe & Australia" },
  { year: 2025, rugs: 1800, milestone: "Sustainability & handmade excellence spotlight" },
];

const HistoryGraph: React.FC = () => {
  return (
    <>
      <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-2 pt-4 sm:pt-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
          MND Nepal Growth Timeline
        </h3>
        <div className="w-full md:w-[85%] md:mx-auto h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[450px] 2xl:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name, props) => [
                  `${value} rugs`,
                  props.payload.milestone,
                ]}
              />
              <Line
                type="monotone"
                dataKey="rugs"
                stroke="#14b8a6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
        MND Nepal employs over 150 skilled artisans and staff, many of whom have spent decades
        mastering their craft. Their dedication transforms every rug into a living piece of Nepal’s
        cultural legacy.
      </p> */}
    </>
  );
};

export default HistoryGraph;
