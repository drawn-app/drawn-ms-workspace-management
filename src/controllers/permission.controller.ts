import Elysia from "elysia";
import PermissionService from "../services/permission.service";
import { CreatePermissionBody, UpdatePermissionBody } from "../dto/permission.dto";

const permissionService = new PermissionService();

export const permissionController = new Elysia({ prefix: '/workspaces/:id/permissions' })

    // GET /workspaces/:id/permissions
    .get('/', async ({ params }) => {
        const permissions = await permissionService.getPermissionsByWorkspaceId(parseInt(params.id));
        return permissions;
    })

    // GET /workspaces/:id/permissions/:permissionId
    .get('/:permissionId', async ({ params }) => {
        const permission = await permissionService.getPermissionById(parseInt(params.id), parseInt(params.permissionId));
        return permission;
    })

    // POST /workspaces/:id/permissions
    .post('/', async ({ params, body }) => {
        const permission = await permissionService.createPermission(parseInt(params.id), body);
        return permission;
    }, {
        body: CreatePermissionBody
    })

    // PUT /workspaces/:id/permissions/:permissionId
    .put('/:permissionId', async ({ params, body }) => {
        const permission = await permissionService.updatePermission(parseInt(params.id), parseInt(params.permissionId), body);
        return permission;
    }, {
        body: UpdatePermissionBody
    })

    // DELETE /workspaces/:id/permissions/:permissionsId
    .delete('/:permissionId', async ({ params }) => {
        const isSuccess = await permissionService.deletePermission(parseInt(params.id), parseInt(params.permissionId));
        return { message: isSuccess ? 'Success' : 'Failed' };
    });