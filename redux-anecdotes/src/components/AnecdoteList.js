import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const updatedAnecdote = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    dispatch(incrementVotesOf(anecdote.id, updatedAnecdote))

    dispatch(setNotification('you voted "' + anecdote.content + '"', 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
