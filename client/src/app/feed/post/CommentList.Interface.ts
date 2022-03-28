export interface ICommentList {
    comment_id: number
    fk_comm_post_id: number
    fk_comm_user_id: number
    comment_text: string
    comment_img_url?: string
    date_of_creation: string
    userData:{
        user_id: number
        fistname: string
        lastName: string
    }
}