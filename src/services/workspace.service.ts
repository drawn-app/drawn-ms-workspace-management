import { Workspace } from "@prisma/client";
import { db } from "../utils/db";
import { CreateWorkspaceInput, UpdateWorkspaceInput } from "../dto/workspace.dto";
import { NotFoundError } from "elysia";

export default class WorkspaceService {
    async getAllWorkspace(userId: string, role: string): Promise<Workspace[]> {
        if (role !== 'admin') {
            return await db.workspace.findMany({
                where: {
                    ownerId: userId
                }
            })
        } else {
            return await db.workspace.findMany()
        }
        
    }

    async getWorkspaceById(id: number, userId: string, role: string): Promise<Workspace | null> {
        const workspace = await db.workspace.findUnique({
            where: {
                id: id
            },
            include: {
                permissions: true
            }
        })

        if (!workspace) throw new NotFoundError("Workspace not found")

        return workspace
    }

    async createWorkspace(userId: string, data: CreateWorkspaceInput): Promise<Workspace> {
        return await db.workspace.create({
            data: {
                ownerId: userId,
                ...data
            }
        })
    }

    async updateWorkspace(id: number, data: UpdateWorkspaceInput): Promise<Workspace | null> {
        try {
            return await db.workspace.update({
                where: {
                    id: id
                },
                data: data
            })
        } catch (error) {
            return null
        }
        
    }

    async deleteWorkspace(id: number): Promise<boolean> {
        try {
            await db.workspace.delete({
                where: {
                    id: id
                }
            })
            return true
        } catch (error) {
            return false
        }
    }
}