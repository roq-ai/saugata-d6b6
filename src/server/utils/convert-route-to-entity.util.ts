const mapping: Record<string, string> = {
  organizations: 'organization',
  riders: 'rider',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
