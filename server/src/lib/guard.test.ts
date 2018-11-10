import guard from './guard';
const accessControl = require('accesscontrol');

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

const ac = new accessControl(permissions);

ac.grant('manager').extend('user');
ac.grant('admin').extend('manager');

const guardLib = guard(ac);

describe('guard lib', () => {
  it("should return false if a 'user' role tries to access any user resources", async () => {
    const allowed = await guardLib.checkPermissions('user', 'readAny', 'user');
    expect(allowed).toBe(false);
  });

  it("should return true if a 'user' role tries to access own user resource", async () => {
    const allowed = await guardLib.checkPermissions('user', 'readOwn', 'user');
    expect(allowed).toBe(true);
  });

  it("should return true if a 'manager' role tries to access any user resources", async () => {
    const allowed = await guardLib.checkPermissions('manager', 'readAny', 'user');
    expect(allowed).toBe(true);
  });

  it("should return false if a 'manager' role tries to access any meal resources", async () => {
    const allowed = await guardLib.checkPermissions('manager', 'readAny', 'meal');
    expect(allowed).toBe(false);
  });

  it("should return true if a 'admin' role tries to access any user resources", async () => {
    const allowed = await guardLib.checkPermissions('admin', 'readAny', 'user');
    expect(allowed).toBe(true);
  });

  it("should return true if a 'admin' role tries to access any meal resources", async () => {
    const allowed = await guardLib.checkPermissions('admin', 'readAny', 'meal');
    expect(allowed).toBe(true);
  });
});
