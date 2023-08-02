export default function Page() {
  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">URL Shortener</h2>
        <form action="api/url-shortener" method="POST">
          <fieldset>
            <legend>URL Shortener</legend>
            <label htmlFor="url_input">URL:</label>
            <input id="url_input" type="text" name="url" placeholder="https://www.freecodecamp.org/" />
            <input type="submit" value="Post" />
          </fieldset>
        </form>
      </div>
      <hr />
    </>
  )
}