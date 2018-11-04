const accessControl = require('accesscontrol');

let ac: any;

const init = async () => {
  if (ac) return ac;

  const permissions = [
    // "User" can CRUD only his own resources
    { role: 'user', resource: 'user', action: 'read:own', attributes: '*' },
    { role: 'user', resource: 'user', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'meal', action: 'create:own', attributes: '*' },
    { role: 'user', resource: 'meal', action: 'read:own', attributes: '*' },
    { role: 'user', resource: 'meal', action: 'update:own', attributes: '*' },
    { role: 'user', resource: 'meal', action: 'delete:own', attributes: '*' },

    // "Manager" can CRUD all user resources
    { role: 'manager', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'manager', resource: 'user', action: 'read:any', attributes: '*' },
    { role: 'manager', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'manager', resource: 'user', action: 'delete:any', attributes: '*' },

    // "Admin" can CRUD all user and all meal resources
    { role: 'admin', resource: 'meal', action: 'create:any', attributes: '*' },
    { role: 'admin', resource: 'meal', action: 'read:any', attributes: '*' },
    { role: 'admin', resource: 'meal', action: 'update:any', attributes: '*' },
    { role: 'admin', resource: 'meal', action: 'delete:any', attributes: '*' },
  ];

  ac = new accessControl(permissions);

  ac.grant('manager').extend('user');
  ac.grant('admin').extend('manager');

  return ac;
};

export { init };
export default ac;
