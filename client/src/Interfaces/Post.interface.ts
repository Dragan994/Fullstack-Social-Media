import { IUserData } from "src/Interfaces/UserData.interface"

export interface IPost{
    post_id: number
    fk_post_user_id: number
    post_img_url: string
    post_text: string
    date_of_creation: string
    userData: IUserData
}