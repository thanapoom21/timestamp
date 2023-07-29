export default function Page() {
  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">Timestamp</h2>
        <h3>Example Usage:</h3>
        <ul>
          <li><a href="api/timestamp/2015-12-25">[project url]/api/timestamp/2015-12-25</a></li>
          <li><a href="api/timestamp/1451001600000">[project url]/api/timestamp/1451001600000</a></li>
        </ul>

        <h3>Example Output:</h3>
        <p>
          <code>
            {`{
              "unix": 1451001600000, <br>
              "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
            }`}
          </code>
        </p>
      </div>
      <hr />
    </>
  )
}