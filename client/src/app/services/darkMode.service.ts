import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class DarkModeService {

    @Output() darkModeToggleEvent = new EventEmitter()


    toggleDarkMode(){
        const darkModeValue = localStorage.getItem('darkMode')

        if(!darkModeValue) {
            this.darkModeToggleEvent.emit(JSON.parse(this.setinitialDarkModeValue()))  // Set initial value to be true on first toggle
        }else{
            const newValue = !JSON.parse(darkModeValue)                 // Parse and convert bool value
            localStorage.setItem('darkMode', JSON.stringify(newValue))  // Write to localStorage
            this.darkModeToggleEvent.emit(newValue)                     // Emmit to others...
        }

    }


    setinitialDarkModeValue(){
        const initialDarkModeValue = JSON.stringify(true)
        localStorage.setItem('darkMode', initialDarkModeValue)
        return initialDarkModeValue
    }

    getDarkModeValue(){
        const darkModeVal = localStorage.getItem('darkMode')
        if(darkModeVal){
            return JSON.parse(darkModeVal)
        }else{
            return false
        }

    }

}