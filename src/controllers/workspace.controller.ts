import Elysia, { NotFoundError, t } from "elysia";
import WorkspaceService from "../services/workspace.service";
import { isNumeric } from "../utils/dataValidator";
import { CreateWorkspaceBody, UpdateWorkspaceBody } from "../dto/workspace.dto";

const workspaceService = new WorkspaceService()

export const workspaceController = new Elysia({ prefix: '/workspace' })

    // GET /workspace
    .get('/', async () => {
        return await workspaceService.getAllWorkspace()
    })

    // GET /workspace/:id
    .get('/:id', async ({ params }) => {
        if (!isNumeric(params.id)) throw new NotFoundError()

        const workspace = await workspaceService.getWorkspaceById(parseInt(params.id))

        if (!workspace) throw new NotFoundError()

        return workspace
    })

    // POST /workspace
    .post('/', async ({ body }) => {
        const workspace = await workspaceService.createWorkspace(body)
        
        return workspace
    }, {
        body: CreateWorkspaceBody
    })

    // PUT /workspace
    .put('/:id', async ({ params, body }) => {
        if (!isNumeric(params.id)) throw new NotFoundError()
        
        const workspace = await workspaceService.updateWorkspace(parseInt(params.id), body)

        if (!workspace) {
            throw new NotFoundError()
        }

        return workspace
    }, {
        body: UpdateWorkspaceBody
    })

    // DELETE /workspace
    .delete('/:id', async ({ params }) => {
        if (!isNumeric(params.id)) throw new NotFoundError()

        const isSuccess = await workspaceService.deleteWorkspace(parseInt(params.id))

        if (!isSuccess) throw new NotFoundError()

        return {
            message: "Success"
        }
    })