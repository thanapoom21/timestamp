'use client'

import { useState } from "react"

export default function Page() {
  const [userId, setUserId] = useState('')
  const handleSubmit = async (event: {
    target: any,
    preventDefault: () => void
  }) => {
    event.preventDefault()

    setUserId(event.target.uid.value)
    console.log(event.target.uid.value)
  }

  return (
    <>
      <a href="/">
        <h1 className="text-3xl font-bold underline mt-5">Go Back</h1>
      </a>
      <hr />
      <div className="container mx-auto">
        <h2 className="text-3xl">Exercise tracker</h2>
        <form className="m-1" action="/api/exercise-tracker" method="post">
          <h3>Create a New User</h3>
          <p><code>POST /api/exercise-tracker</code></p>
          <input id="uname" type="text" name="username" placeholder="username" />
          <input type="submit" value="Submit" />
        </form>
        <form id="exercise-form" onSubmit={handleSubmit} action={`/api/exercise-tracker/${userId}/exercises`} method="post">
          <h3>Add exercises</h3>
          <p><code>POST /api/exercise-tracker/:_id/exercises</code></p>
          <input id="uid" type="text" name=":_id" placeholder=":_id" />
          <input id="desc" type="text" name="description" placeholder="description*" />
          <input id="dur" type="text" name="duration" placeholder="duration* (mins.)" />
          <input id="date" type="text" name="date" placeholder="date (yyyy-mm-dd)" />
          <input type="submit" value="Submit" />
        </form>
        <p>
          <strong>GET user's exercise log: </strong>
          <code>GET /api/exercise-tracker/:_id/logs?[from][&amp;to][&amp;limit]</code>
        </p>
        <p><strong>[ ]</strong> = optional</p>
        <p><strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong> = number</p>
      </div>
      <hr />
    </>
  )
}