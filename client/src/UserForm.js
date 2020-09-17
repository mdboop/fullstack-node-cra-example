import React from "react";
import { Card, InputField, Stack } from "bumbag";
export default function UserForm() {
  return (
    <Card title="Create new user" variant="bordered">
      <Stack direction="vertical">
        <InputField label="First Name" type="text" />
        <InputField label="Last Name" type="text" />
        <InputField label="Age" type="number" />
      </Stack>
    </Card>
  );
}
