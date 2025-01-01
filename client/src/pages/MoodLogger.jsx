import React, { useState } from "react";
import { Bar, Radar } from "react-chartjs-2";
import Swal from "sweetalert2";
import DiscreteSliderMarks from "../DiscreteSliderMarks";
import SideButtons from "../components/SideButtons";
import Header from "../components/Header"; // Your provided Header component
import {
  Chart as ChartJS,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const MoodLogger = () => {
  const [mood, setMood] = useState({
    stress: 50,
    happiness: 50,
    energy: 50,
    focus: 50,
    calmness: 50,
  });

  const [sleep, setSleep] = useState({
    duration: 6,
    quality: 50,
  });

  const [mentalHealthRating, setMentalHealthRating] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sidebar state management
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMoodChange = (field, value) => {
    setMood((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSleepChange = (field, value) => {
    setSleep((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stress, happiness, energy, focus, calmness } = mood;
    const { duration, quality } = sleep;

    if (!stress || !happiness || !energy || !focus || !calmness || !duration || !quality) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setMentalHealthRating(75); // Placeholder value
      setRecommendation("Stay active, focus on sleep hygiene, and consider mindful practices.");
      setLoading(false);
    }, 2000);
  };

  const moodChartData = {
    labels: ["Stress", "Happiness", "Energy", "Focus", "Calmness"],
    datasets: [
      {
        label: "Mood",
        data: [
          mood.stress,
          mood.happiness,
          mood.energy,
          mood.focus,
          mood.calmness,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const sleepChartData = {
    labels: ["Duration (hours)", "Quality (%)"],
    datasets: [
      {
        label: "Sleep",
        data: [sleep.duration, sleep.quality],
        backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideButtons isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        id="main-content"
        style={{
          flex: 1,
          marginLeft: isExpanded ? "260px" : "80px",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Use your provided Header component */}
        <Header />
        <div style={{ paddingTop: "60px", padding: "20px" }}>
          <h1 style={{ textAlign: "center", marginBottom: "15px", fontSize: "28px", color: "#333" }}>
            Mood and Sleep Logger
          </h1>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* Logger Form Section */}
            <div style={{ flex: 1, maxWidth: "60%" }}>
              <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "16px", color: "#555" }}>
                  How do you feel today?
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem", // Reduced the gap between columns
                    justifyContent: "center",
                    paddingLeft: "10%", // Slightly shifts to the right
                  }}
                >
                  {Object.keys(mood).map((moodType) => (
                    <div key={moodType} style={{ minWidth: "100px" }}>
                      <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" }}>
                        {moodType.charAt(0).toUpperCase() + moodType.slice(1)}
                      </label>
                      <DiscreteSliderMarks
                        value={mood[moodType]}
                        onChange={(value) => handleMoodChange(moodType, value)}
                      />
                    </div>
                  ))}
                  <div style={{ minWidth: "100px" }}>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" }}>
                      Sleep Duration (hours)
                    </label>
                    <DiscreteSliderMarks
                      value={sleep.duration}
                      min={0}
                      max={24}
                      step={1}
                      onChange={(value) => handleSleepChange("duration", value)}
                    />
                  </div>
                  <div style={{ minWidth: "100px" }}>
                    <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" }}>
                      Sleep Quality (%)
                    </label>
                    <DiscreteSliderMarks
                      value={sleep.quality}
                      onChange={(value) => handleSleepChange("quality", value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "14px",
                    backgroundColor: "#6B46C1",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: "none",
                    color: "#fff",
                    marginLeft: "65px"
                  }}
                >
                  {loading ? "Analyzing..." : "Log Data"}
                </button>
              </form>
            </div>

            {/* Graph Section */}
            <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: "40px",  }}>
              <div style={{ height: "250px", maxWidth: "100%" }}>
                <Radar data={moodChartData} options={chartOptions} />
              </div>
              <div style={{ height: "250px", maxWidth: "80%",  marginLeft:"40px"}}>
                <Bar data={sleepChartData} options={chartOptions} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            {mentalHealthRating !== null && (
              <div style={{ marginBottom: "20px" }}>
                <h3>Your Mental Health Rating:</h3>
                <textarea
                  readOnly
                  value={mentalHealthRating}
                  style={{
                    width: "100%",
                    minHeight: "50px",
                    padding: "10px",
                    fontSize: "24px",
                    borderRadius: "5px",
                    resize: "none",
                    background: "transparent",
                    color: "purple",
                  }}
                ></textarea>
              </div>
            )}
            {recommendation && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3 style={{ marginBottom: "15px", color: "#333", textAlign: "center" }}>
                  Personalized Recommendation:
                </h3>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>{recommendation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodLogger;
