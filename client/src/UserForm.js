import React, { useState } from "react"
import { Card, InputField, Stack, Button, Alert } from "bumbag"

import { createUser } from "./api"
export default function UserForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")

  return (
    <Card title="Create new user" variant="bordered">
      <Stack direction="vertical">
        <InputField
          isRequired
          label="First Name"
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
        <InputField
          isRequired
          label="Last Name"
          type="text"
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
        <InputField
          isRequired
          label="Age"
          type="number"
          onChange={(e) => {
            setAge(e.target.value)
          }}
        />
        <Button
          onClick={async () => {
            setLoading(true)
            try {
              const res = await createUser({
                firstName,
                lastName,
                age: parseInt(age, 10),
              })
              console.log(res)
            } catch (e) {
              setError(e)
            } finally {
              setLoading(false)
            }
          }}
        >
          Create
        </Button>
        {!!error && (
          <Alert
            title="Could not create user!"
            showCloseButton
            type="danger"
            onClickClose={() => {
              setError(null)
            }}
          >
            Something went wrong and we couldn't create your user. Message:{" "}
            {error.message}
          </Alert>
        )}
      </Stack>
    </Card>
  )
}
