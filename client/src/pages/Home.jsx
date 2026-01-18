import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Bars from '../components/Bars'
import { Train } from 'lucide-react'
import Trainer from '../components/Trainer'
import Plans from '../components/Plans'
import { ArrowRight } from 'lucide-react'
import Social from '../components/Social'
import Footer from '../components/Footer'
import Mcard from '../components/Mcard'
import CTA from '../components/CTA'

function Home() {
  const { user } = useSelector(state => state.auth)

  const getDaysRemaining = () => {
    if (!user || !user.membership || !user.membership.endDate) return 0;
    const now = new Date();
    const end = new Date(user.membership.endDate);
    const diffTime = end - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();
  const isActive = user && user.membership && daysRemaining > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      {/* <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block text-5xl mb-6">💪</div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Transform Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Track your workouts, monitor progress, and achieve your fitness goals with our comprehensive gym tracking platform.
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user.role === 'admin' ? (
                <Link
                  to="/admin"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
                >
                  Go to Admin Panel
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition text-white"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </section> */}


      {/* Hero Section */}
      <section id="home">
        {isActive && <Mcard />}
        <Hero />
      </section>

      <section id="about">
        <CTA />
      </section>

      {/* Features Section */}
      <section id="about">
        <Features />
      </section>

      <section id="trainings">
        <Bars />
        <Trainer />
      </section>

      <section id="pricing">
        <Plans />
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-white dark:bg-black py-24 md:py-32 px-6 overflow-hidden relative border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
          {/* Decorative Background Text (Matches Hero Style) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <span className="text-[40vw] font-black uppercase tracking-tighter text-black dark:text-white">FITNESS</span>
          </div>

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6 block">
              Begin your evolution
            </span>

            <h2 className="text-5xl md:text-9xl font-black text-black dark:text-white uppercase tracking-tighter leading-[0.85] mb-12">
              Ready to <br />
              <span className="text-zinc-300 dark:text-zinc-700">Start?</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to="/register"
                className="group flex items-center gap-4 px-10 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300"
              >
                Create Your Account
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="max-w-[200px] text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
                Join thousands of users tracking their fitness goals today.
              </p>
            </div>
          </div>
        </section>
      )}

      <section id="testimonials">
        <Social />
      </section>

      {/* Footer */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  )
}

export default Home
