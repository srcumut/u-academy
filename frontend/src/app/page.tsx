import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-50">

      {/* Background Blobs for Atmosphere */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">

        {/* Badge / Pill */}
        <div className="mb-8 inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-100 bg-white/50 backdrop-blur-sm shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
          <span className="text-sm font-medium text-slate-600">v1.0 Yayında</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Geleceğin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Öğrenim</span>
          <br /> Platformu
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          U-Academy ile potansiyelini keşfet. Modern araçlar, sezgisel arayüz ve
          kişiselleştirilmiş öğrenim deneyimi seni bekliyor.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Hemen Başla
          </Link>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 text-slate-700 font-semibold rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-200"
          >
            Daha Fazla Bilgi
          </a>
        </div>

        {/* Stats or Trust Markers (Optional) */}
        <div className="mt-16 pt-8 border-t border-slate-200 w-full grid grid-cols-3 gap-8 text-center opacity-60">
          <div>
            <div className="text-2xl font-bold text-slate-900">100+</div>
            <div className="text-sm text-slate-600">Öğrenci</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">50+</div>
            <div className="text-sm text-slate-600">Eğitmen</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">∞</div>
            <div className="text-sm text-slate-600">İçerik</div>
          </div>
        </div>

      </main>
    </div>
  );
}
