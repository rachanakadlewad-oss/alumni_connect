"use client";
export default function LoginPage() {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        Continue with Google
      </button>
    </div>
  );
}
