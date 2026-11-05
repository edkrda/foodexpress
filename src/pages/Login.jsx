
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabase.js";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Erro do Supabase:", error);
        alert("Erro ao fazer login: " + error.message);
        return;
      }

      if (data.session) {
        alert("Login realizado com sucesso!");
        navigate("/catalog");
      } else {
        alert("Não foi possível iniciar a sessão.");
      }

    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar com o Supabase: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">🍔 FoodExpress</div>

      <div className="login-card">
        <h1 className="login-title">Bem-vindo de volta!</h1>
        <p className="login-subtitle">Faça login para pedir sua refeição favorita</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>

        <p className="login-footer">
          Novo por aqui? <Link to="/signup" className="login-link">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
