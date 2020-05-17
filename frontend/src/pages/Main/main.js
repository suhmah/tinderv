import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { Container } from "./style";

import api from "../../services/api";

import logo from "../../assets/logo.svg";
import dislike from "../../assets/dislike.svg";
import like from "../../assets/like.svg";
import itsamacth from "../../assets/itsamatch.png";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id,
        },
      });
      const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

      setUsers(shuffleArray(response.data));
    }
    loadUser();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:3333/", {
      query: { user: match.params.id },
    });

    socket.on("match", (dev) => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }
  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt="avatar" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :( </div>
      )}
      {matchDev && (
        <div className="match-container">
          <img src={itsamacth} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="avatar" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>
            fechar
          </button>
        </div>
      )}
    </Container>
  );
}