import { Permission, Workspace } from "@prisma/client";
import { db } from "../utils/db";
import { CreatePermissionInput, UpdatePermissionInput } from "../dto/permission.dto"; // Import DTOs

export default class PermissionService {
    async getPermissionsByWorkspaceId(workspaceId: number): Promise<Permission[]> {
        return await db.permission.findMany({
            where: {
                workspaceId
            }
        });
    }

    async getPermissionById(workspaceId: number, permissionId: number): Promise<Permission | null> {
        return await db.permission.findUnique({
            where: {
                id: permissionId,
                workspaceId
            }
        });
    }

    async createPermission(workspaceId: number, data: CreatePermissionInput): Promise<Permission> {
        return await db.permission.create({
            data: {
                workspaceId,
                ...data
            }
        });
    }

    async updatePermission(workspaceId: number, permissionId: number, data: UpdatePermissionInput): Promise<Permission | null> {
        try {
            return await db.permission.update({
                where: {
                    id: permissionId,
                    workspaceId
                },
                data
            });
        } catch (error) {
            return null;
        }
    }

    async deletePermission(workspaceId: number, permissionId: number): Promise<boolean> {
        try {
            await db.permission.delete({
                where: {
                    id: permissionId,
                    workspaceId
                }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}