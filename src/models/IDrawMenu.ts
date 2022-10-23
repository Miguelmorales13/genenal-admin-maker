export interface IDrawMenuItem {
    title: string
    path: string
    icon: any
}

export interface IDrawMenu {
    title: string
    items: IDrawMenuItem[]
}
