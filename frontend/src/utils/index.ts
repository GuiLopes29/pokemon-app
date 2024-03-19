// Função para verificar se o token está expirado
function checkTokenExpiry(token: string | null): boolean {
  if (!token) {
    return true;
  }

  try {
    // Decodifica o token
    const { exp } = JSON.parse(atob(token.split(".")[1]));

    // Verifica se a data de expiração é menor que a data atual
    if (Date.now() >= exp * 1000) {
      return true;
    } else {
      return false;
    }
  } catch {
    return true;
  }
}

export { checkTokenExpiry };
