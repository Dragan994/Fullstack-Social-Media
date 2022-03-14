
import {Pipe} from "@angular/core"
import * as english from "../../languages/en.json"
import * as srbLatinic from "../../languages/sr-latinic.json"
import { fetchFromObject } from "src/utils/fetchFromObject"

@Pipe({
    name:"translate"
})


export class TranslatePipe {



    transform( prop: string ):string{
        return fetchFromObject(english, prop) !== undefined ? fetchFromObject(english, prop): prop

    }
}