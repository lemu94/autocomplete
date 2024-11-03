# Angular Autocomplete Component

🚀 Simplifier l'Utilisation du Composant AutoComplete d'Angular Material avec un Composant d'Autocomplétion Personnalisé 🌟

En tant que développeur Angular, j'ai souvent rencontré des défis lors de l'implémentation de composants comme l'autocomplétion de Material Angular. Bien que puissants, ces composants peuvent devenir complexes à utiliser et à adapter à des besoins spécifiques.

Pour répondre à ces problématiques, j'ai créé un AutoCompleteComponent qui apporte une couche d'abstraction, simplifiant ainsi son utilisation et renforçant la réutilisabilité.

Voici quelques avantages de mon composant :

Validation des Données : Assure que les données passées sont des objets non nuls, évitant les erreurs à l'exécution.

Configuration Simplifiée : Permet une gestion facile des propriétés d'affichage et de filtrage via un objet de configuration.

Gestion des Événements : Émet des événements encapsulés, facilitant l'intégration avec le reste de l'application.

Réutilisabilité : Conçu de manière générique, il peut s'adapter à différents types d'objets sans réécriture de code.

Je suis ravi de partager cette avancée qui, je l'espère, aidera d'autres développeurs à naviguer plus aisément dans l'écosystème Angular Material.

N'hésitez pas à partager vos retours ou à me poser des questions !

#Angular #TypeScript #WebDevelopment #OpenSource #Innovation
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
