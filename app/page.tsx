export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold mt-5">Backend Projects</h1>
      
      <div className="container mx-auto">
        <div className="flex flex-col space-y-2 px-4">
          <a href="/timestamp" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Timestamp
          </a>
          <a href="/request-header-parser" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Request Header Parser
          </a>
          <a href="/url-shortener" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            URL Shortener
          </a>
          <a href="/exercise-tracker" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Exercise tracker
          </a>
          {/* <a href="/file-metadata" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            File Metadata
          </a> */}
        </div>
      </div>
    </>
  )
}