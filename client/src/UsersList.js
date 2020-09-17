import React, { useEffect, useState } from "react"
import { Text, Stack, Card, Spinner, Box, Button } from "bumbag"

import { getUsers } from "./api"

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchUsers() {
    setLoading(true)
    try {
      const users = await getUsers()
      setUsers(users)
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (error) {
    // Return early if we have an error
    return <Error error={error} />
  }

  return (
    <Stack>
      <Button
        isLoading={loading}
        onClick={() => {
          fetchUsers()
        }}
      >
        Refresh
      </Button>
      {users.map((user) => (
        <User user={user} />
      ))}
    </Stack>
  )
}

function User({ user }) {
  return (
    <Card>
      <Stack direction="vertical">
        <Text>{user.firstName}</Text>
        <Text>{user.lastName}</Text>
        <Text>{user.age}</Text>
      </Stack>
    </Card>
  )
}

function Error({ error }) {
  return (
    <Card title="Couldn't fetch users" variant="bordered">
      Something went wrong! (status: {error.status})
    </Card>
  )
}

function Loading() {
  return (
    <Box justifyContent="center" alignItems="center">
      <Spinner size="large" />
    </Box>
  )
}
