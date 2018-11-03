import { init as getAccessControlInstance } from '../../config/access-control/ac';

export default (function guard() {
  return {
    /**
     * Check permissions, based on the role of the current user, action
     * executed from the endpoint handler and the desired resource
     * s
     * @param {string} role - the role of the user that requests to access the resource
     * @param {string} action - the action being executed on the resource
     * @param {string} resource - the resource that needs to be accessed
     *
     * @see [AccessControl module]{@link https://onury.io/accesscontrol}
     * @returns {boolean} The result of the permission check
     */
    checkPermissions: async (role: string, action: string, resource: string) => {
      const ac = await getAccessControlInstance();
      return ac.can(role)[action](resource).granted;
    },
  };
})();
