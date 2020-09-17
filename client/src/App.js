import React from "react";
import { Provider as BumbagProvider, Columns, Box } from "bumbag";

import UserForm from "./UserForm";
import UsersList from "./UsersList";

export default function App() {
  return (
    <BumbagProvider>
      <Box padding="32px">
        <Columns>
          <Columns.Column spread={4} spreadOffset="left">
            <UserForm />
          </Columns.Column>
          <Columns.Column spread={4} spreadOffset="right">
            <UsersList />
          </Columns.Column>
        </Columns>
      </Box>
    </BumbagProvider>
  );
}
