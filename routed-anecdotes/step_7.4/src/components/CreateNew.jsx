import React from 'react'

const CreateNew = () => (
  <div>
    <h2>Create a new anecdote</h2>
    <form>
      <div>
        Content <input name="content" />
      </div>
      <div>
        Author <input name="author" />
      </div>
      <div>
        Info <input name="info" />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

export default CreateNew
