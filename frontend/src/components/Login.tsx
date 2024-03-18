import React, { useState } from "react";
import styled, { css } from "styled-components";

interface User {
  username: string;
  password: string;
}

interface LoginInputProps {
  error?: boolean;
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  background: transparent;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const LoginInput = styled.input<LoginInputProps>`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  ${(props) =>
    props.error &&
    css`
      border-color: red;
    `}
`;

const LoginButton = styled.button<{ register?: boolean }>`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.register ? "green" : "blue")};
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;

const GuestButton = styled.button`
  background-color: gray;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em; // Reduz o tamanho da fonte
`;

const LoginScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/login_background.jpg") no-repeat center center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;
  height: auto; // ajuste a altura para auto
  padding: 20px; // adicione algum padding para separar o formulário das bordas da tela
`;

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [register, setRegister] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === "username") setUsernameError(false);
    if (e.target.name === "password") setPasswordError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.username) setUsernameError(true);
    if (!user.password) setPasswordError(true);

    if (user.username && user.password) {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        // Redireciona o usuário para a página inicial
        window.location.href = "/";
      } else if (response.status === 404) {
        setRegister(true);
      } else {
        setUsernameError(true);
        setPasswordError(true);
      }
    }
  };

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      setRegister(false);

      // Redireciona o usuário para a página inicial
      window.location.href = "/";
    }
  };

  const handleGuestLogin = async () => {
    const response = await fetch("http://localhost:3000/guest");
    const data = await response.json();

    localStorage.setItem("token", data.token);

    // Redireciona o usuário para a página inicial
    window.location.href = "/";
  };

  return (
    <LoginScreen>
      <LoginContainer>
        <LoginForm onSubmit={register ? handleRegister : handleSubmit}>
          <LoginInput
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Usuario"
            error={usernameError}
          />
          <LoginInput
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Senha"
            error={passwordError}
          />
          {(usernameError || passwordError) && (
            <ErrorMessage>Usuario e senha são obrigatórios</ErrorMessage>
          )}
          {register ? (
            <LoginButton register type="submit">
              Registrar
            </LoginButton>
          ) : (
            <LoginButton type="submit">Login</LoginButton>
          )}{" "}
          <GuestButton type="button" onClick={handleGuestLogin}>
            Entrar como convidado
          </GuestButton>
        </LoginForm>
      </LoginContainer>
    </LoginScreen>
  );
};

export default Login;
