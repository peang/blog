import { ALL_SCOPE } from "../RolesGuardService";

export default {
  LIST: {
    PERMISSION: 'LIST_BLOG',
    DOMAIN: 'blog',
    RESOURCE: 'user',
    ACTION: 'add',
    SCOPES: ALL_SCOPE,
    ROLES: ['user']
  },
  CREATE: {
    PERMISSION: 'CREATE_BLOG',
    DOMAIN: 'blog',
    RESOURCE: 'user',
    ACTION: 'add',
    SCOPES: ALL_SCOPE,
    ROLES: ['user']
  },
}