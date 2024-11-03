import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, EMPTY, map, Observable, startWith } from "rxjs";
import { MatIconModule } from "@angular/material/icon";

/**
 * Type representing an option to display in autocomplete.
 * @template T -Option data type
 */
type display<T> = {
    option: T,
    field: keyof T
};

/**
 * Configuring fields for auto-completion.
 * @template T - Option data type.
 */
type configField<T> = {
    filter: keyof T,
    show: keyof T,
    get: keyof T,
};

/**
 * Custom autocomplete component.
 * This component provides an abstraction layer to the base Angular Material Autocomplete component.
 *
 * @example
 * <app-autocomplete 
 *   [listeData]="liste_personn" 
 *   [configField]="{'show': 'nom', 'filter': 'nom', 'get': 'adresse'}"
 *   [label]="'liste des personnes'"
 *   (onChangeValue)="valeur($event)">
 * </app-autocomplete>
 */


@Component({
    selector: "app-autocomplete",
    templateUrl: "./autocomplete.component.html",
    styleUrls: ["./autocomplete.component.scss"],
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        ReactiveFormsModule,
        AsyncPipe,
    ],
    standalone: true
})
export class AutoCompleteComponent<T> implements OnInit {

    
    /**
     * List of data to display in autocomplete.
     */
    @Input({ required: true }) listeData: Array<T> = [];

    /**
     * Configuring fields for auto-completion.
     */
    @Input({ required: true }) configField!: configField<T>;

    /**
     * Configuring label for input
     */

    @Input({required : true}) label : string="field of search";

    /**
     * Event emitted when the selected value changes.
     */
    @Output() onChangeValue = new EventEmitter<T>();
    @Output() onEmitFormState = new EventEmitter<FormControl>();

    /**
     * Input field control.
     */
    myControlAuto = new FormControl("");

    /**
     * Filtered options to display in autocomplete.
     */
    filteredOptions: Observable<T[]> = EMPTY;

    ngOnInit(): void {
        if (!Array.isArray(this.listeData) || this.listeData.some(item => typeof item !== 'object' || item === null)) {
            throw new Error('listeData must be an array of non-null objects');
          }
        this.onFocusControlAuto();
    }

    /**
     * Initializes the filtering of options when the input field is focused.
     */
    onFocusControlAuto() {
        this.filteredOptions = this.myControlAuto.valueChanges.pipe(
            startWith(''),
            debounceTime(300), 
            distinctUntilChanged(), 
            map(value => this._filter(value as string)),
        );

        this.myControlAuto.valueChanges.subscribe(value => {
            if (this.listeData.some(option => option[this.configField.filter] === value)) {
                const foundOption = this.listeData.find(option => option[this.configField.filter] === value)!;
                this.changeValue({ option: foundOption, field: this.configField.show });
            }
        });
    }

    /**
     * Filters options based on the entered value.
     * @param {string} value - The value entered in the search field.
     * @returns {T[]} - A table of filtered options.
     */
    private _filter(value: string): T[] {
        let filterValue="";
       if(typeof value === 'string')filterValue = value?.toLowerCase();
        return this.listeData.filter(option =>
            (option[this.configField.show] as string)?.toLowerCase().includes(filterValue)
        );
    }

    /**
     * Function to display an option in autocomplete.
     * @param {display<T>} value - The display object containing the option and field to display.
     * @returns {string} - The string to display.
     */
    protected displayFn(value: display<T>): string {
        return value && value?.option[value.field] ? (value.option[value.field] as string) : '';
    }

    /**
     * Changes the selected value and emits the event.
     * @param {display<T>} value - The display object containing the selected option.
     */
    protected changeValue(value: display<T>) {
        this.onChangeValue.emit(value.option);
    }
    
}
