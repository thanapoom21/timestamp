
export default function Page() {
  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">Exercise tracker</h2>
        <form action="/api/users" method="post">
          <h3>Create a New User</h3>
          <p><code>POST /api/users</code></p>
          <input id="uname" type="text" name="username" placeholder="username" />
          <input type="submit" value="Submit" />
        </form>
        <form id="exercise-form" method="post">
          <h3>Add exercises</h3>
          <p><code>POST /api/users/:_id/exercises</code></p>
          <input id="uid" type="text" name=":_id" placeholder=":_id" />
          <input id="desc" type="text" name="description" placeholder="description*" />
          <input id="dur" type="text" name="duration" placeholder="duration* (mins.)" />
          <input id="date" type="text" name="date" placeholder="date (yyyy-mm-dd)" />
          <input type="submit" value="Submit" />
        </form>
        <p>
          <strong>GET user's exercise log: </strong>
          <code>GET /api/users/:_id/logs?[from][&amp;to][&amp;limit]</code>
        </p>
        <p><strong>[ ]</strong> = optional</p>
        <p><strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong> = number</p>
      </div>
      <hr />
    </>
  )
}