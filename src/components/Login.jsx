import React, { useState } from "react";

function login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const espacio = "\u00A0";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const { data, error } = await response.json();
      if (error) {
        throw new Error(error);
      }
      setEmail("");
      setPassword("");
      setError("");
      window.location.href = "/";
    } catch (error) {
      console.error(`Hay un error ${error}`);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-auto bg-zinc-900 p-2 rounded-full hover:scale-110 transition-all duration-150"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
          alt="Spotify clone"
        />
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-green-600">
          Inicia sesión
        </h2>
      </div>
      {error && (
        <span className="sm:mx-auto sm:w-full sm:max-w-sm text-sm bg-red-600 px-2 py-3 rounded-md -mb-8">
          {error}
        </span>
      )}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-green-600"
            >
              Correo
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 focus:ring-0 focus:outline-none text-white bg-zinc-900 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-green-600"
              >
                Contraseña
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-green-600 hover:text-green-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 focus:ring-0 focus:outline-none text-white bg-zinc-900 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Inicia sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?
          <a
            href="/register"
            className="font-semibold leading-6 text-green-600 hover:text-green-500"
          >
            {espacio}Regístrate acá
          </a>
        </p>
      </div>
    </div>
  );
}

export default login;
