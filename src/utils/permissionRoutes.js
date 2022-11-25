function hasPermission(permissions, route) {
  if (route?.meta && route?.meta?.permissions) {
    return permissions.some(permission => route.meta.permissions.includes(permission))
  } else {
    // 若是菜单分组，默认有权限
    return true
  }
}

export function filterRoutes(routes, permissions) {
  const res = []

  // 管理员返回所有菜单权限
  if (permissions.includes('app:admin')) {
    return routes
  }

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp?.children) {
        tmp.children = filterRoutes(tmp.children, permissions)
        // 菜单分组下用户无任何菜单权限，则不push到权限菜单中
        if (tmp.children.length === 0) {
          return
        }
      }
      res.push(tmp)
    }
  })

  return res
}
