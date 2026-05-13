import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: formData.email, password: formData.password });
      navigate("/home");
    } catch (err) {
      const msg = err?.response?.data?.message ?? "Credenciales incorrectas.";
      showError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center p-8 pt-36">
      <div className="order-1 flex w-5/12 flex-col justify-center gap-2 space-y-6 rounded-2xl border border-gray-200 bg-white/70 p-8 px-16 py-8 shadow-2xl backdrop-blur-md md:order-1">
        <h1 className="text-oscuro self-start text-5xl leading-tight font-semibold md:text-2xl">
          Inicia sesión en tu cuenta
        </h1>

        <Input
          label="Email"
          placeholder="Ej. juansanchez@gmail.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button text="Iniciar Sesión" type="submit" className="bg-morado text-white" />

        <p className="text-oscuro text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-morado hover:text-moradoIntermedio font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
