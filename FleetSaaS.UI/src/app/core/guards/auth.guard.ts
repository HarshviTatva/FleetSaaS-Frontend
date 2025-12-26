import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "../auth/services/token.service";
import { ROUTE_PATH } from "../../shared/utils/route-path.static";

export const authGuard: CanActivateFn = () => {
 const authService = inject(TokenService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate([ROUTE_PATH.auth.login]);
    return false;
  }

  return true;
}