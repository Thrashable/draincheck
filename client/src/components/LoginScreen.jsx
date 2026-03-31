import { motion } from 'framer-motion';

export default function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-category-music/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-surface-raised border border-surface-border rounded-2xl p-10 text-center relative overflow-hidden">
          {/* Subtle top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-coral/50 to-transparent" />

          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <svg width="44" height="44" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L4 8V14C4 20 8 25 14 26C20 25 24 20 24 14V8L14 2Z" stroke="#FF6B6B" strokeWidth="1.5" fill="none" />
                <path d="M9 14L14 9L19 14" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 9V20" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="18" x2="20" y2="18" stroke="#FF6B6B" strokeWidth="1" opacity="0.4" />
                <line x1="9" y1="21" x2="19" y2="21" stroke="#FF6B6B" strokeWidth="1" opacity="0.25" />
              </svg>
              <h1 className="font-display text-3xl font-bold text-text-primary tracking-tight">
                Draincheck
              </h1>
            </div>
            <p className="text-text-secondary text-base font-body leading-relaxed">
              See what's draining your wallet
            </p>
          </div>

          {/* Sign in button */}
          <a
            href="/auth/google"
            className="group relative inline-flex items-center justify-center gap-3 w-full py-4 px-6 bg-text-primary text-surface-base font-body font-semibold text-base rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg hover:shadow-accent-coral/10 hover:-translate-y-0.5 active:translate-y-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </a>

          <p className="mt-6 text-text-muted text-xs font-body">
            We only read your email metadata. Never stored, never shared.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs mt-6 font-body">
          Powered by Gmail API
        </p>
      </motion.div>
    </div>
  );
}
