import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  console.log({data, name, email, message});
  console.log('Si llegó')
  // if (!name || !email || !message) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "Faltan campos requeridos",
  //     }),
  //     { status: 400 }
  //   );
  // }

  return new Response(
    JSON.stringify({
      message: "¡Éxito!",
    }),
    { status: 200 }
  );
};
