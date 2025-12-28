import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Abigail Spencer</h1>
        <p className="text-xl text-gray-600 mb-8">
          Data Analyst | Data Scientist | Python Developer
        </p>
        
        <div className="space-y-4">
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Resume
          </a>
          
          <div>
            <a 
              href="/resume.pdf" 
              download="Abigail_Spencer_Resume.pdf"
              className="text-blue-600 hover:underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}