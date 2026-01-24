import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a className="text-blue-600" href="#">u-academy</a>
        </h1>
        <p className="mt-3 text-2xl">
          Get started by logging in.
        </p>
        <div className="flex mt-6 space-x-4">
          <Link href="/login" className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Login Page
          </Link>
        </div>
      </main>
    </div>
  );
}
