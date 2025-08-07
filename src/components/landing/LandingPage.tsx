import './landing.css';

function LandingPage({setPage}: { setPage: (page: string) => void }) {
  return (
    <div className="max-w-4xl px-4 py-24 mx-auto sm:px-6 lg:px-8">
      <div className="relative overflow-hidden bg-white shadow-md rounded-3xl">
        <div className="relative z-10 p-8 text-center md:p-16 lg:p-20">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            LearnNest
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
            LearnNest is a personal learning management system (LMS) that helps you organize, practice, and track your progress through custom-built quizzes across any topic or skill you're mastering 
          </p>
          <button
            onClick={() => setPage("dashboard")}
            className="inline-block px-8 py-4 text-lg font-semibold !text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Go to quiz dashboard
          </button>
        </div>

        {/* Floating AI Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "0.2s", top: "5%", left: "5%" }}
            src="https://eliteai.tools/images/home/1.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "0.6s", top: "5%", right: "5%" }}
            src="https://eliteai.tools/images/home/3.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "0.8s", top: "45%", left: "15%" }}
            src="https://eliteai.tools/images/home/5.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "1.2s", top: "45%", right: "15%" }}
            src="https://eliteai.tools/images/home/10.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "1.4s", top: "85%", left: "5%" }}
            src="https://eliteai.tools/images/home/4.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: "1.8s", top: "85%", right: "5%" }}
            src="https://eliteai.tools/images/home/8.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100 hidden md:block"
            style={{ animationDelay: "2.0s", top: "25%", left: "30%" }}
            src="https://eliteai.tools/images/home/9.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100 hidden md:block"
            style={{ animationDelay: "2.2s", top: "65%", right: "30%" }}
            src="https://eliteai.tools/images/home/7.svg"
            alt="AI Icon"
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage