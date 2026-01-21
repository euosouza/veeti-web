// src/app/core/interceptors/http-error.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

      // 2. Erro de conexão (Offline ou Servidor caiu)
      if (error.status === 0) {
        errorMessage = "Sem conexão com a internet ou servidor indisponível.";
      }
      // 3. Erros vindos do Backend (NestJS)
      else if (error.error) {
        // NestJS com class-validator pode retornar message como array
        if (Array.isArray(error.error.message)) {
          errorMessage = error.error.message[0]; // Pega o primeiro erro da validação
        } else if (typeof error.error.message === "string") {
          errorMessage = error.error.message;
        }
      }

      // 4. Tratamento específico por Status Code
      switch (error.status) {
        case HttpStatusCode.Unauthorized: // 401
          errorMessage = "Sessão expirada. Faça login novamente.";
          // Opcional: Limpar storage
          router.navigate(["/login"]);
          break;

        case HttpStatusCode.Forbidden: // 403
          errorMessage = "Você não tem permissão para realizar esta ação.";
          break;

        case HttpStatusCode.NotFound: // 404
          errorMessage = "Recurso não encontrado.";
          break;

        case HttpStatusCode.UnprocessableEntity: // 422 (Erros de negócio/validação)
          // Mantém a mensagem extraída do backend acima
          break;

        case HttpStatusCode.InternalServerError: // 500
          errorMessage = "Erro interno no servidor. Contate o suporte.";
          break;
      }

      // 5. Exibe notificação visual para o usuário
      console.error(errorMessage);

      // Relança o erro para que o componente pare o loading, etc.
      return throwError(() => error);
    })
  );
};
