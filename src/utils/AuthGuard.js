import { useUserStore } from '../stores/user';

export function authGuard(to, from, next) {
  const userStore = useUserStore();

  if (userStore.isAuthenticated) {
    next();
  } else {
    next('/auth');
  }
}
