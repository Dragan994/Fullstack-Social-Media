
import {Pipe} from "@angular/core"
import * as english from "../../languages/en.json"
import * as srbLatinic from "../../languages/sr-latinic.json"
import { fetchFromObject } from "src/utils/fetchFromObject"
import { LanguageService } from "../services/language.service"

@Pipe({
    name:"translate",
    pure: false
})


export class TranslatePipe {

    public language = english 
    constructor(){}
    
    transform( prop: string ):string{
        const selectedLanguage = localStorage.getItem('lang')
        if(selectedLanguage === 'sr'){
            this.language = srbLatinic
        }else if(selectedLanguage === 'en'){
            this.language = english
        }
        return fetchFromObject(this.language, prop) !== undefined ? fetchFromObject(this.language, prop): prop
    }
}