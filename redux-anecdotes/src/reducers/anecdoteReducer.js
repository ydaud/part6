import anecdoteService from '../services/anecdotes'

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.add(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const incrementVotesOf = (id, content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(id, content)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const sortByVotes = (a, b) => b.votes - a.votes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return state
        .concat(action.data)
        .sort(sortByVotes)
    case 'INCREMENT_VOTE':
      const newAnecdote = action.data
      return state
        .map(a => a.id === newAnecdote.id ? newAnecdote : a)
        .sort(sortByVotes)
    case 'INIT_ANECDOTES':
      return action.data.sort(sortByVotes)
    default:
      return state.sort(sortByVotes)
  }
}


export default reducer
