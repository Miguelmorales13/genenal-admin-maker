export interface CrudModel<M> {
    getAll(): Promise<(dispatch: Function, getState: Function) => void>

    create(m: M): Promise<(dispatch: Function, getState: Function) => void>

    update(m: M): Promise<(dispatch: Function, getState: Function) => void>

    delete(id: number): Promise<(dispatch: Function, getState: Function) => void>
}

