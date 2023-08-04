export default function Page() {
  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">File Metadata</h2>

        <h3>Usage:</h3>
        <p>
          Please Upload a File ...
        </p>
        <div className="view">
          <h4 id="output"></h4>
          <form encType="multipart/form-data" method="POST" action="/api/file-metadata">
            <input id="inputfield" type="file" name="upfile" />
            <input id="button" type="submit" value="Upload" />
          </form>
        </div>
      </div>
      <hr />
    </>
  )
}