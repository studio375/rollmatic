export async function verifyTurnstileToken(token, remoteip) {
    if (!token) return false;
  
    try {
      const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
            ...(remoteip ? { remoteip } : {}),
          }),
        },
      );
      const data = await res.json();
      return data.success === true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }