export default function Page() {
  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">Request Header Parser</h2>

        <h3>Example Usage:</h3>
        <p>
          <a href="api/request-header-parser">[project url]/api/request-header-parser</a>
        </p>

        <h3>Example Output:</h3>
        <p>
          <code>
            {`{
              "ipaddress": "this could be different",
              "language":"en-US,en;q=0.5",
              "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
            }`}
          </code>
        </p>
      </div>
      <hr />
    </>
  )
}