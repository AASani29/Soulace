// import { Link } from "react-router-dom";
// import Header from "../components/Header.jsx";
// import SideButtons from "../components/SideButtons";

// const SubscribePage = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
//       {/* Header */}
//       <Header />

//       {/* Side Buttons */}
//       <SideButtons />

//       {/* Main Content */}
//       <main className="flex-grow">
//         <div className="max-w-6xl mx-auto mt-16 bg-white shadow-2xl rounded-xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white text-center py-8">
//             <h2 className="text-4xl font-bold">Choose Your Plan</h2>
//             <p className="text-lg mt-2">
//               Start with a Free Trial or explore our Premium Plans!
//             </p>
//           </div>

//           {/* Pricing Sections */}
//           <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
//             {/* Free Trial */}
//             <div className="flex flex-col items-center border border-gray-200 shadow-lg rounded-xl p-8 bg-gradient-to-br from-teal-50 to-white">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Trial</h3>
//               <p className="text-gray-700 text-center mb-6">
//                 Enjoy all premium features for 7 days, completely free!
//               </p>
//               <ul className="text-gray-700 space-y-4 text-left">
//                 <li>✔️ Personalized Content Recommendations</li>
//                 <li>✔️ Mood-Reflective Daily Journal</li>
//                 <li>✔️ Achievement Dashboard</li>
//                 <li>✔️ Track Your Progress</li>
//                 <li>✔️ Connect with a Specialist</li>
//               </ul>
//               <div className="text-teal-800 text-3xl font-bold mt-6"><span className="text-lg font-medium"></span></div>
//               <div className="text-teal-800 text-3xl font-bold mt-6"><span className="text-lg font-medium"></span></div>

//               <Link
//                 to="/"
//                 className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
//               >
//                 Start Free Trial
//               </Link>
//             </div>

//             {/* Monthly Plan */}
//             <div className="flex flex-col items-center border border-teal-400 shadow-xl rounded-xl p-8 bg-gradient-to-br from-teal-200 to-teal-50">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">Monthly Plan</h3>
//               <p className="text-gray-700 text-center mb-6">
//                 Unlock all premium features for just $10/month.
//               </p>
//               <ul className="text-gray-700 space-y-4 text-left">
//                 <li>✔️ Personalized Content Recommendations</li>
//                 <li>✔️ Mood-Reflective Daily Journal</li>
//                 <li>✔️ Achievement Dashboard</li>
//                 <li>✔️ Track Your Progress</li>
//                 <li>✔️ Connect with a Specialist</li>
//               </ul>
//               <div className="text-teal-800 text-3xl font-bold mt-6">$10<span className="text-lg font-medium">/month</span></div>
//               <Link
//                 to="/monthly-plan"
//                 className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
//               >
//                 Subscribe Monthly
//               </Link>
//             </div>

//             {/* Yearly Plan */}
//             <div className="flex flex-col items-center border border-teal-400 shadow-xl rounded-xl p-8 bg-gradient-to-br from-yellow-200 to-yellow-50">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">Yearly Plan</h3>
//               <p className="text-gray-700 text-center mb-6">
//                 Save 20% with our yearly subscription at $96/year.
//               </p>
//               <ul className="text-gray-700 space-y-4 text-left">
//                 <li>✔️ Personalized Content Recommendations</li>
//                 <li>✔️ Mood-Reflective Daily Journal</li>
//                 <li>✔️ Achievement Dashboard</li>
//                 <li>✔️ Track Your Progress</li>
//                 <li>✔️ Connect with a Specialist</li>
//               </ul>
//               <div className="text-yellow-800 text-3xl font-bold mt-6">$96<span className="text-lg font-medium">/year</span></div>
//               <Link
//                 to="/yearly-plan"
//                 className="mt-6 bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700 transition duration-300"
//               >
//                 Subscribe Yearly
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SubscribePage;

//--------------------------------------------------------------------
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import SideButtons from "../components/SideButtons";

const SubscribePage = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  const startFreeTrial = async () => {
    try {
      const response = await fetch("/api/user/start-trial", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        alert("Free trial started! You now have access to premium features.");
        navigate("/"); // Redirect to the home page or any premium page
      } else {
        alert(data.message || "Failed to start the free trial.");
      }
    } catch (error) {
      console.error("Error starting free trial:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#2c2c2c]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300 "
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <Header />

        <div className="max-w-6xl mx-auto mt-16 bg-white dark:bg-transparent shadow-2xl dark:shadow-black rounded-xl overflow-hidden dark:border dark:border-teal-700">
          <div className="bg-gradient-to-r from-teal-600 dark:from-teal-800 to-teal-400 dark:to-teal-600 text-white text-center py-8">
            <h2 className="text-4xl font-bold">Choose Your Plan</h2>
            <p className="text-lg mt-2">
              Start with a Free Trial or explore our Premium Plans!
            </p>
          </div>
          <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Free Trial */}
            <div className="flex flex-col items-center border border-gray-200 dark:border-teal-700 shadow-lg dark:shadow-black rounded-xl p-8 bg-gradient-to-br from-teal-50 dark:from-teal-950 to-white dark:to-teal-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-teal-300 mb-4">
                Free Trial
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-center mb-6">
                Enjoy all premium features for 7 days, completely free!
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-4 text-left">
                <li>✔️ Personalized Content Recommendations</li>
                <li>✔️ Mood-Reflective Daily Journal</li>
                <li>✔️ Achievement Dashboard</li>
                <li>✔️ Track Your Progress</li>
                <li>✔️ Connect with a Specialist</li>
              </ul>
              <div className="text-teal-800 text-3xl font-bold mt-6">
                ---<span className="text-lg font-medium"></span>
              </div>
              <button
                onClick={startFreeTrial}
                className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Start Free Trial
              </button>
            </div>
            {/* Monthly and Yearly Plans */}
            <div className="flex flex-col items-center border border-teal-400 dark:border-teal-700 shadow-xl dark:shadow-black rounded-xl p-8 bg-gradient-to-br from-teal-200 dark:from-black to-teal-50 dark:to-teal-950">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-teal-200 mb-4">
                Monthly Plan
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                Unlock all premium features for just ৳200/month.
              </p>
              <ul className="text-gray-700 dark:text-gray-400 space-y-4 text-left">
                <li>✔️ Personalized Content Recommendations</li>
                <li>✔️ Mood-Reflective Daily Journal</li>
                <li>✔️ Achievement Dashboard</li>
                <li>✔️ Track Your Progress</li>
                <li>✔️ Connect with a Specialist</li>
              </ul>
              <div className="text-teal-800 dark:text-teal-500 text-3xl font-bold mt-6">
                ৳200<span className="text-lg font-medium">/month</span>
              </div>
              <Link
                to="/payment"
                className="mt-6 bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Subscribe Monthly
              </Link>
            </div>

            {/* Yearly Plan */}
            <div className="flex flex-col items-center border border-teal-400 dark:border-blue-700 shadow-xl dark:shadow-black rounded-xl p-8 bg-gradient-to-br from-yellow-200 dark:from-blue-950 to-yellow-50 dark:to-blue-800">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-blue-300 mb-4">
                Yearly Plan
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                Save 20% with our yearly subscription at ৳2000/year.
              </p>
              <ul className="text-gray-700 dark:text-gray-400 space-y-4 text-left">
                <li>✔️ Personalized Content Recommendations</li>
                <li>✔️ Mood-Reflective Daily Journal</li>
                <li>✔️ Achievement Dashboard</li>
                <li>✔️ Track Your Progress</li>
                <li>✔️ Connect with a Specialist</li>
              </ul>
              <div className="text-yellow-800 dark:text-blue-300 text-3xl font-bold mt-6">
                ৳2000<span className="text-lg font-medium">/year</span>
              </div>
              <Link
                to="/payment"
                className="mt-6 bg-yellow-600 dark:bg-blue-400 text-white dark:text-blue-950 py-2 px-6 rounded-lg hover:bg-yellow-700 dark:hover:bg-blue-500 transition duration-300"
              >
                Subscribe Yearly
              </Link>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </div>
  );
};

export default SubscribePage;
