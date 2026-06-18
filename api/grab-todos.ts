import axios from "axios";

export async function GET(request: Request) {
  console.log("🟢 Backend triggered! URL is:", request.url);
  const { searchParams } = new URL(request.url);

  try {
    const response = await axios.get(
      "https://jsonplaceholder.cypress.io/todos",
      {
        params: Object.fromEntries(searchParams),
        timeout: 5000
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    let errorStatus = 500;
    let errorMessage = "Internal Server Error";

    if (axios.isAxiosError(error)) {
      errorStatus = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      console.error(`Secure Server Log: ${error.message}`);
    } else {
      errorMessage = "An unexpected error occurred";
      console.error("Secure Server Log: An unknown error type was caught.");
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: errorStatus,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
