import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '~/stores/user'

export function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  const router = useRouter()

  if (userStore.isAuthenticated && ['/vhod', '/register'].includes(to.fullPath)) {
    router.push('/')
  }
  else if (!userStore.isAuthenticated && ['/admin'].includes(to.fullPath)) {
    router.push('/')
  }

  next()
}
