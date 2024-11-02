# Angular Autocomplete Component

## Description

This Angular component provides a generic autocomplete feature, allowing users to search and select options from a dynamic list. It uses Angular Material modules for optimal styling and interactivity.

## Installation

Make sure you have Angular Material installed in your project. If not, you can install it by running the following command:

```bash
ng add @angular/material

```
```typescript
import { AutoCompleteComponent } from './path/to/autocomplete.component';
```
```html
<app-autocomplete
[listData]="dataList"
[configField]="{ filter: 'name', show: 'name', get: 'address' }"
label="Search for a name"
(onChangeValue)="onValueChange($event)">
</app-autocomplete>
```
## Properties

- **@Input() listData: Array<T>**
List of data to display in the autocomplete (required).

- **@Input() configField: configField<T>**
Configuration of the fields for the autocomplete (required). Must contain:
- `filter`: key to filter the options.
- `show`: key to display the options.
- `get`: key to retrieve the options.

- **@Input() label: string**
Label for the input field (required).

## Events

- **@Output() onChangeValue**
Emitted when the selected value changes. Receive the selected option object.

## Internal Methods

- **ngOnInit()**
Initializes the filtering of options when the input field is focused.

- **_filter(value: string): T[]**
Filters the options based on the entered value.

- **displayFn(value: display<T>): string**
Returns the string to display for the selected option.
