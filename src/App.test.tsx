import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { initializeTestApp, assertSucceeds } from "@firebase/testing"

const my_project_id = "typescript-chat-7885d"

describe('chat app', () => {

  test('renders singIn', () => {
    render(<App />)
    const signInButton = screen.getByTestId("signInWithGoogle")
    expect(signInButton).toBeInTheDocument();
  });

  test('can read from database', async () => {
    const db = initializeTestApp({projectId: my_project_id}).firestore();
    const testDoc = db.collection("messages")
    await assertSucceeds(testDoc.get())
  })

})
