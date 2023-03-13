import BlogActions from './rbac/BlogActions';
import { ALL_ROLE, ALL_SCOPE } from './RolesGuardService';

export class RBAC {
  public static getPermissionsByRole(role: string) {
    const payload = {};
    const permissions = [];

    for (const action of Object.keys(RBAC.ACTIONS)) {
      const actions = RBAC.ACTIONS[action];

      if (actions.ROLES.indexOf(role) !== -1 || actions.ROLES.indexOf('*')) {
        if (!payload[actions.DOMAIN]) {
          payload[actions.DOMAIN] = {}
        }

        if (!payload[actions.DOMAIN][actions.RESOURCE]) {
          payload[actions.DOMAIN][actions.RESOURCE] = []
        }

        if (payload[actions.DOMAIN][actions.RESOURCE].indexOf(actions.ACTION) === -1) {
          payload[actions.DOMAIN][actions.RESOURCE].push(actions.ACTION)
        }
      }
    }

    for (const domain of Object.keys(payload)) {
      const domainData = {
        name: domain,
        resources: []
      }

      for (const resources of Object.keys(payload[domain])) {
        const resourceData = {
          name: resources,
          actions: payload[domain]
        }

        domainData.resources.push(resourceData);
      }

      permissions.push(domainData);
    }

    return permissions;
  }

  public static ACTIONS = {
    AUTH_REFRESH: {
      PERMISSION: 'AUTH_REFRESH',
      DOMAIN: 'user',
      RESOURCE: 'auth',
      ACTION: 'refresh',
      SCOPES: ALL_SCOPE,
      ROLES: ALL_ROLE
    },
    STORE_FCM: {
      PERMISSION: 'STORE_FCM',
      DOMAIN: 'fcm',
      RESOURCE: 'fcm',
      ACTION: 'store',
      SCOPES: ALL_SCOPE,
      ROLES: ALL_ROLE
    },

    ...BlogActions,
  };
}
