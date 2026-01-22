import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { delay } from "rxjs";

export const delayInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Add a 1500ms delay to all requests (as requested by user)
  // You can add logic here to only delay specific requests if needed
  // e.g., if (req.url.includes('/api/'))
  return next(req).pipe(delay(1500));
};
