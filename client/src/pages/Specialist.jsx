// //---------------------------------------------------------------------------------------------------------

// import axios from "axios";
// import { Brain, Heart, Shield } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Footer from "../components/Footer.jsx";
// import Header from "../components/Header"; // Ensure Header component is correctly imported
// import SideButtons from "../components/SideButtons";

// const MentalHealthForm = () => {
//   const [formData, setFormData] = useState({
//     Age: "",
//     Gender: "",
//     Ethnicity: "",
//     EducationLevel: "",
//     EmploymentStatus: "",
//     DepressionScore_PHQ9: "",
//     AnxietyScore_GAD7: "",
//     StressLevel: "",
//     SleepHours: "",
//     AppetiteChange: "",
//     SubstanceUse: "",
//     PhysicalActivity: "",
//     SocialInteractions: "",
//     LivingSituation: "",
//     SupportSystems: "",
//     TraumaticEvents: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate
//   const [isExpanded, setIsExpanded] = useState(true);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/predict",
//         formData
//       );

//       const probability = response.data.probability;

//       setResult(probability);

//       // Navigate to /recommendation with the probability as state
//       navigate("/recommendation", { state: { probability: probability } });
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-[#2c2c2c]">
//       <SideButtons />
//       <div
//         id="main-content"
//         className="flex-1 transition-all duration-300"
//         style={{ marginLeft: isExpanded ? "260px" : "80px" }}
//       >
//         <Header />

//         {/* Hero Section */}
//         <div className="bg-gradient-to-b from-teal-900 dark:from-teal-950 dark:to-teal-700 to-teal-200 rounded-2xl text-white py-4 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h1 className="text-5xl font-bold mb-6 dark:text-teal-300">
//                   Your Mental Health Matters
//                 </h1>
//                 <p className="text-xl mb-8 text-teal-100">
//                   Take our comprehensive assessment to understand your mental
//                   well-being better. Your responses are confidential and will
//                   help us provide personalized recommendations.
//                 </p>
//                 <div className="flex gap-6">
//                   <div className="flex items-center gap-2">
//                     <Shield className="w-6 h-6" />
//                     <span>Confidential</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Brain className="w-6 h-6" />
//                     <span>Professional</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Heart className="w-6 h-6" />
//                     <span>Supportive</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="hidden md:block">
//                 <img
//                   src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//                   alt="Mental Health Support"
//                   className="rounded-lg shadow-2xl dark:shadow-black"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Assessment Form Section */}
//         <div className="min-h-screen bg-gradient-to-b from-white dark:from-teal-950 dark:to-transparent to-teal-50 flex flex-col items-center p-6">
//           <div className="text-center mb-12 mt-8">
//             <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-500 mb-4">
//               Mental Health Assessment
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               Complete this comprehensive assessment to receive personalized
//               insights about your mental well-being. Your honest responses will
//               help us provide the most accurate recommendations.
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="bg-white dark:bg-teal-900 shadow-xl dark:shadow-black rounded-2xl p-8 max-w-2xl w-full mb-12"
//           >
//             <div className="bg-teal-50 dark:bg-black -mx-8 -mt-8 mb-8 p-6 rounded-t-2xl border-b border-teal-100 dark:border-teal-700">
//               <h3 className="text-2xl font-semibold text-teal-800 dark:text-teal-500">
//                 Personal Information
//               </h3>
//               <p className="text-teal-600 mt-2">
//                 All information provided is kept strictly confidential
//               </p>
//             </div>

//             {/* Age */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Age:
//               </label>
//               <input
//                 type="number"
//                 name="Age"
//                 value={formData.Age}
//                 onChange={handleChange}
//                 min="18"
//                 max="100"
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//                 placeholder="Enter your age"
//               />
//             </div>

//             {/* Gender */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Gender:
//               </label>
//               <select
//                 name="Gender"
//                 value={formData.Gender}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Non-binary">Non-binary</option>
//                 <option value="Prefer not to say">Prefer not to say</option>
//               </select>
//             </div>

//             {/* Ethnicity */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Ethnicity:
//               </label>
//               <select
//                 name="Ethnicity"
//                 value={formData.Ethnicity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Caucasian">Caucasian</option>
//                 <option value="Asian">Asian</option>
//                 <option value="Hispanic">Hispanic</option>
//                 <option value="African American">African American</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Education Level */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Education Level:
//               </label>
//               <select
//                 name="EducationLevel"
//                 value={formData.EducationLevel}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="High School">High School</option>
//                 <option value="Bachelor’s Degree">Bachelor’s Degree</option>
//                 <option value="Master’s Degree">Master’s Degree</option>
//                 <option value="Doctorate">Doctorate</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Employment Status */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Employment Status:
//               </label>
//               <select
//                 name="EmploymentStatus"
//                 value={formData.EmploymentStatus}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Employed">Employed</option>
//                 <option value="Unemployed">Unemployed</option>
//                 <option value="Student">Student</option>
//                 <option value="Self-Employed">Self-Employed</option>
//                 <option value="Retired">Retired</option>
//               </select>
//             </div>

//             {/* Depression Score */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 How often have you felt down, depressed, or hopeless?
//               </label>
//               <input
//                 type="number"
//                 name="DepressionScore_PHQ9"
//                 value={formData.DepressionScore_PHQ9}
//                 onChange={handleChange}
//                 min="0"
//                 max="27"
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//                 placeholder="Rate from 0 (Never) to 27 (Always)"
//               />
//             </div>

//             {/* Anxiety Score */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 How often have you felt nervous, anxious, or on edge?
//               </label>
//               <input
//                 type="number"
//                 name="AnxietyScore_GAD7"
//                 value={formData.AnxietyScore_GAD7}
//                 onChange={handleChange}
//                 min="0"
//                 max="21"
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//                 placeholder="Rate from 0 (Never) to 21 (Always)"
//               />
//             </div>

//             {/* Stress Level */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Stress Level:
//               </label>
//               <select
//                 name="StressLevel"
//                 value={formData.StressLevel}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Low">Low</option>
//                 <option value="Moderate">Moderate</option>
//                 <option value="High">High</option>
//                 <option value="Very High">Very High</option>
//               </select>
//             </div>

//             {/* Sleep Hours */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Average Sleep Hours:
//               </label>
//               <input
//                 type="number"
//                 name="SleepHours"
//                 value={formData.SleepHours}
//                 onChange={handleChange}
//                 step="0.1"
//                 min="4"
//                 max="12"
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//                 placeholder="Enter average sleep hours"
//               />
//             </div>

//             {/* Appetite Change */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Appetite Change:
//               </label>
//               <select
//                 name="AppetiteChange"
//                 value={formData.AppetiteChange}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Increased">Increased</option>
//                 <option value="Decreased">Decreased</option>
//                 <option value="Stable">Stable</option>
//               </select>
//             </div>

//             {/* Substance Use */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Substance Use:
//               </label>
//               <select
//                 name="SubstanceUse"
//                 value={formData.SubstanceUse}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             {/* Physical Activity */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Physical Activity:
//               </label>
//               <select
//                 name="PhysicalActivity"
//                 value={formData.PhysicalActivity}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Low">Low</option>
//                 <option value="Moderate">Moderate</option>
//                 <option value="High">High</option>
//               </select>
//             </div>

//             {/* Social Interactions */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Social Interactions:
//               </label>
//               <select
//                 name="SocialInteractions"
//                 value={formData.SocialInteractions}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Poor">Poor</option>
//                 <option value="Limited">Limited</option>
//                 <option value="Good">Good</option>
//               </select>
//             </div>

//             {/* Living Situation */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Living Situation:
//               </label>
//               <select
//                 name="LivingSituation"
//                 value={formData.LivingSituation}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Alone">Alone</option>
//                 <option value="With family">With family</option>
//                 <option value="With roommates">With roommates</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Support Systems */}
//             <div className="mb-4">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Support Systems:
//               </label>
//               <select
//                 name="SupportSystems"
//                 value={formData.SupportSystems}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Weak">Weak</option>
//                 <option value="Moderate">Moderate</option>
//                 <option value="Strong">Strong</option>
//               </select>
//             </div>

//             {/* Traumatic Events */}
//             <div className="mb-6">
//               <label className="block mb-2 text-gray-600 dark:text-gray-300">
//                 Exposure to Traumatic Events:
//               </label>
//               <select
//                 name="TraumaticEvents"
//                 value={formData.TraumaticEvents}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-teal-600 text-white py-4 px-6 rounded-lg hover:bg-teal-700 transition duration-300 font-semibold text-lg ${
//                 loading ? "cursor-not-allowed opacity-50" : ""
//               }`}
//             >
//               {loading ? "Processing..." : "Submit Assessment"}
//             </button>
//           </form>

//           {/* Error Display */}
//           {error && (
//             <div className="mt-8 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r w-full max-w-2xl">
//               <div className="flex">
//                 <div className="flex-shrink-0">⚠️</div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Results Display */}
//           {result !== null && !error && (
//             <div className="mt-8 bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-6 rounded-r w-full max-w-2xl">
//               <h3 className="text-xl font-bold mb-3">Assessment Results</h3>
//               {result > 0.5 ? (
//                 <p className="text-lg">
//                   Based on your responses, there's a {(result * 100).toFixed(2)}
//                   % indication that professional support could be beneficial for
//                   your mental well-being.
//                 </p>
//               ) : (
//                 <p className="text-lg">
//                   Based on your responses, there's a {(result * 100).toFixed(2)}
//                   % indication that you're managing well at this time.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         <Footer></Footer>
//       </div>
//     </div>
//   );
// };

// export default MentalHealthForm;

//---------------------------------------------------------------------------------------------------------

import axios from "axios";
import { Brain, Heart, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "../components/Footer.jsx";
import Header from "../components/Header"; // Ensure Header component is correctly imported
import SideButtons from "../components/SideButtons";
import { Groq } from "groq-sdk";

const MentalHealthForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Ethnicity: "",
    EducationLevel: "",
    EmploymentStatus: "",
    DepressionScore_PHQ9: "",
    AnxietyScore_GAD7: "",
    StressLevel: "",
    SleepHours: "",
    AppetiteChange: "",
    SubstanceUse: "",
    PhysicalActivity: "",
    SocialInteractions: "",
    LivingSituation: "",
    SupportSystems: "",
    TraumaticEvents: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate
  const [isExpanded, setIsExpanded] = useState(true);

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Create a prompt for Groq
      const prompt = `
        You're a professional mental health expert. Analyze this mental health assessment and provide ONLY a probability percentage (0-100%) 
        that the person might benefit from professional help. Give result carefully. Consider these factors:
        
        - Age: ${formData.Age}
        - Gender: ${formData.Gender}
        - Ethnicity: ${formData.Ethnicity}
        - Education Level: ${formData.EducationLevel}
        - Employment Status: ${formData.EmploymentStatus}

        - Depression Score (PHQ-9): ${formData.DepressionScore_PHQ9}/27
        - Anxiety Score (GAD-7): ${formData.AnxietyScore_GAD7}/21
        - Stress: ${formData.StressLevel}
        - Sleep: ${formData.SleepHours} hrs/night
        - Appetite Change: ${formData.AppetiteChange}
        - Substance Use: ${formData.SubstanceUse}
        - Physical Activity: ${formData.PhysicalActivity}
        - Social Interactions: ${formData.SocialInteractions}
        - Living Situation: ${formData.LivingSituation}
        - Support: ${formData.SupportSystems}
        - Trauma History: ${formData.TraumaticEvents}
        
        Respond with ONLY the percentage number (e.g., "72%").
      `;

      // Call Groq API
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_tokens: 10,
      });

      // Extract percentage from response (e.g., "75%")
      const percentageText = response.choices[0].message.content.trim();
      const probability = parseFloat(percentageText) / 100;

      // Navigate to recommendation page with the result
      navigate("/recommendation", { state: { probability } });
    } catch (err) {
      setError(err.message || "Failed to analyze assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#2c2c2c]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <Header />

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-teal-900 dark:from-teal-950 dark:to-teal-700 to-teal-200 rounded-2xl text-white py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6 dark:text-teal-300">
                  Your Mental Health Matters
                </h1>
                <p className="text-xl mb-8 text-teal-100">
                  Take our comprehensive assessment to understand your mental
                  well-being better. Your responses are confidential and will
                  help us provide personalized recommendations.
                </p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    <span>Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    <span>Professional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    <span>Supportive</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Mental Health Support"
                  className="rounded-lg shadow-2xl dark:shadow-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Form Section */}
        <div className="min-h-screen bg-gradient-to-b from-white dark:from-teal-950 dark:to-transparent to-teal-50 flex flex-col items-center p-6">
          <div className="text-center mb-12 mt-8">
            <h2 className="text-4xl font-bold text-teal-800 dark:text-teal-500 mb-4">
              Mental Health Assessment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete this comprehensive assessment to receive personalized
              insights about your mental well-being. Your honest responses will
              help us provide the most accurate recommendations.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-teal-900 shadow-xl dark:shadow-black rounded-2xl p-8 max-w-2xl w-full mb-12"
          >
            <div className="bg-teal-50 dark:bg-black -mx-8 -mt-8 mb-8 p-6 rounded-t-2xl border-b border-teal-100 dark:border-teal-700">
              <h3 className="text-2xl font-semibold text-teal-800 dark:text-teal-500">
                Personal Information
              </h3>
              <p className="text-teal-600 mt-2">
                All information provided is kept strictly confidential
              </p>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Age:
              </label>
              <input
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                min="18"
                max="100"
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
                placeholder="Enter your age"
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Gender:
              </label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Ethnicity */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Ethnicity:
              </label>
              <select
                name="Ethnicity"
                value={formData.Ethnicity}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Caucasian">Caucasian</option>
                <option value="Asian">Asian</option>
                <option value="Hispanic">Hispanic</option>
                <option value="African American">African American</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Education Level */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Education Level:
              </label>
              <select
                name="EducationLevel"
                value={formData.EducationLevel}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                <option value="Master’s Degree">Master’s Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Employment Status */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Employment Status:
              </label>
              <select
                name="EmploymentStatus"
                value={formData.EmploymentStatus}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Retired">Retired</option>
              </select>
            </div>

            {/* Depression Score */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                How often have you felt down, depressed, or hopeless?
              </label>
              <input
                type="number"
                name="DepressionScore_PHQ9"
                value={formData.DepressionScore_PHQ9}
                onChange={handleChange}
                min="0"
                max="27"
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
                placeholder="Rate from 0 (Never) to 27 (Always)"
              />
            </div>

            {/* Anxiety Score */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                How often have you felt nervous, anxious, or on edge?
              </label>
              <input
                type="number"
                name="AnxietyScore_GAD7"
                value={formData.AnxietyScore_GAD7}
                onChange={handleChange}
                min="0"
                max="21"
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
                placeholder="Rate from 0 (Never) to 21 (Always)"
              />
            </div>

            {/* Stress Level */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Stress Level:
              </label>
              <select
                name="StressLevel"
                value={formData.StressLevel}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>

            {/* Sleep Hours */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Average Sleep Hours:
              </label>
              <input
                type="number"
                name="SleepHours"
                value={formData.SleepHours}
                onChange={handleChange}
                step="0.1"
                min="4"
                max="12"
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
                placeholder="Enter average sleep hours"
              />
            </div>

            {/* Appetite Change */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Appetite Change:
              </label>
              <select
                name="AppetiteChange"
                value={formData.AppetiteChange}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Increased">Increased</option>
                <option value="Decreased">Decreased</option>
                <option value="Stable">Stable</option>
              </select>
            </div>

            {/* Substance Use */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Substance Use:
              </label>
              <select
                name="SubstanceUse"
                value={formData.SubstanceUse}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Physical Activity */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Physical Activity:
              </label>
              <select
                name="PhysicalActivity"
                value={formData.PhysicalActivity}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Social Interactions */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Social Interactions:
              </label>
              <select
                name="SocialInteractions"
                value={formData.SocialInteractions}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Poor">Poor</option>
                <option value="Limited">Limited</option>
                <option value="Good">Good</option>
              </select>
            </div>

            {/* Living Situation */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Living Situation:
              </label>
              <select
                name="LivingSituation"
                value={formData.LivingSituation}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Alone">Alone</option>
                <option value="With family">With family</option>
                <option value="With roommates">With roommates</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Support Systems */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Support Systems:
              </label>
              <select
                name="SupportSystems"
                value={formData.SupportSystems}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Weak">Weak</option>
                <option value="Moderate">Moderate</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            {/* Traumatic Events */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-600 dark:text-gray-300">
                Exposure to Traumatic Events:
              </label>
              <select
                name="TraumaticEvents"
                value={formData.TraumaticEvents}
                onChange={handleChange}
                required
                className="w-full p-3 dark:bg-teal-950 dark:text-white border border-gray-300 dark:border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-teal-700"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-teal-600 text-white py-4 px-6 rounded-lg hover:bg-teal-700 transition duration-300 font-semibold text-lg ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit Assessment"}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r w-full max-w-2xl">
              <div className="flex">
                <div className="flex-shrink-0">⚠️</div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result !== null && !error && (
            <div className="mt-8 bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-6 rounded-r w-full max-w-2xl">
              <h3 className="text-xl font-bold mb-3">Assessment Results</h3>
              {result > 0.5 ? (
                <p className="text-lg">
                  Based on your responses, there's a {(result * 100).toFixed(2)}
                  % indication that professional support could be beneficial for
                  your mental well-being.
                </p>
              ) : (
                <p className="text-lg">
                  Based on your responses, there's a {(result * 100).toFixed(2)}
                  % indication that you're managing well at this time.
                </p>
              )}
            </div>
          )}
        </div>

        <Footer></Footer>
      </div>
    </div>
  );
};

export default MentalHealthForm;
