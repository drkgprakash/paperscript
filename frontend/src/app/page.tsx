export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="border-b border-gray-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600" />
            <span className="text-xl font-bold text-gray-900">PaperScript</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign In
            </a>
            <a href="/register" className="btn-primary">
              Get Started Free
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scientific Publishing,{" "}
            <span className="text-primary-600">Simplified</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            AI-powered manuscript formatting. Real-time collaboration. 
            Multi-format publishing. Convert your Word documents to 
            publication-ready LaTeX in minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="/register" className="btn-primary text-base px-8 py-3">
              Start Writing Free
            </a>
            <a href="#features" className="btn-secondary text-base px-8 py-3">
              See Features
            </a>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-gray-100 bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Everything you need for scientific publishing
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "AI-Powered Conversion",
                  description: "Upload Word documents and convert them to publication-ready LaTeX using journal templates.",
                },
                {
                  title: "Real-Time Collaboration",
                  description: "Edit documents simultaneously with co-authors. Track changes, comment, and chat in real-time.",
                },
                {
                  title: "Multi-Format Export",
                  description: "Export to PDF, LaTeX, HTML, XML, JATS XML, and ePUB from a single source.",
                },
                {
                  title: "Journal Templates",
                  description: "Publisher-approved templates with class files, bibliography styles, and custom macros.",
                },
                {
                  title: "Version History",
                  description: "Track every change. Compare, label, and restore previous versions at any time.",
                },
                {
                  title: "Enterprise Ready",
                  description: "Role-based access, subscription billing, API keys, and comprehensive audit logs.",
                },
              ].map((feature) => (
                <div key={feature.title} className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to streamline your publishing workflow?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join researchers and publishers who trust PaperScript for their manuscripts.
            </p>
            <a href="/register" className="btn-primary mt-8 inline-block text-base px-8 py-3">
              Get Started Free
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 PaperScript. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
