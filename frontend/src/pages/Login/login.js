import React, { useState } from "react";
import { Container } from "./style";

import logo from "../../assets/logo.svg";

import api from "../../services/api";

export default function Login({ history }) {
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      username,
    });

    const { _id } = response.data;

    history.push(`/devs/${_id}`);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="digite seu usuário no Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </Container>
  );
}
