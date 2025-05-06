// src/utils/errors.ts
export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
export class NotFoundServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
export class InternetError extends Error {
  constructor() {
    super("No hay conexión a internet 😵");
    this.name = "InternetError";
  }
}
export class ConnectionError extends Error {
  constructor() {
    super("No hay conexión con el servicio 😵");
    this.name = "InternetError";
  }
}
export class SyntaxJsonError extends Error {
  constructor() {
    super("Error en la comunicacion con el servicio 😢");
    this.name = "SyntaxJsonError";
  }
}

export class ForbiddenApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}
