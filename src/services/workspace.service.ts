import { Workspace } from "@prisma/client";
import { db } from "../utils/db";
import { CreateWorkspaceInput, UpdateWorkspaceInput } from "../dto/workspace.dto";

export default class WorkspaceService {
    async getAllWorkspace(): Promise<Workspace[]> {
        return await db.workspace.findMany()
    }

    async getWorkspaceById(id: number): Promise<Workspace | null> {
        return await db.workspace.findUnique({
            where: {
                id: id
            }
        })
    }

    async createWorkspace(data: CreateWorkspaceInput): Promise<Workspace> {
        return await db.workspace.create({
            data: data
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