"use client"

import { ChartPoint } from "../types/dashboard";
import { formatDate } from "@/lib/formatDate";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface FeedChartProps {
    data: ChartPoint[];
}

export default function FeedChart({ data }: FeedChartProps) {
    const chartData = {
        labels: data.map((item) => item.date ? formatDate(item.date) : item.label ?? ""),

        datasets: [
            {
                label: "Feed Consumption (kg)",
                data: data.map((item) => item.total_feed ?? item.value ?? 0),
                borderColor: "#c2410c",
                backgroundColor: "#c2410c",
                pointBackgroundColor: "#f97316",
                pointBorderColor: "#fff7ed",
                pointHoverBackgroundColor: "#ea580c",
                pointHoverBorderColor: "#9a3412",
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 3,
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <Line data={chartData} />
        </div>
    );
}
