# Tabs Component

A flexible tabs component to switch between different content sections.

## Installation

Ensure you have the Tabs component in your project:

`import { VTabsComponent, VTabComponent, VTabTitleComponent, VTabContentComponent } from 'libs/ui/components/tabs/v-tabs.component';`

## API

### VTabsComponent (`v-tabs`)

The main container for the tabs.

| Input | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultValue` | `number` | `0` | The index of the default active tab. |
| `width` | `'default' \| 'full'` | `'default'` | Controls the width of the tab triggers. |
| `variant` | `'underline' \| 'pill'` | `'underline'` | Controls the visual style of the tabs. |

### VTabComponent (`v-tab`)

Represents an individual tab unit. Tracks active state.

| Input | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Disables interaction with the tab. |

### VTabTitleComponent (`v-tab-title`)

Place inside `v-tab`. Defines the content to be displayed in the tab header list.

### VTabContentComponent (`v-tab-content`)

Place inside `v-tab`. Defines the content panel to be shown when the tab is active.

## Usage

### Basic Usage

```html
<v-tabs>
  <v-tab>
    <v-tab-title>Account</v-tab-title>
    <v-tab-content>
        Account content here.
    </v-tab-content>
  </v-tab>
  
  <v-tab>
    <v-tab-title>Password</v-tab-title>
    <v-tab-content>
        Password content here.
    </v-tab-content>
  </v-tab>
</v-tabs>
```

### With Full Width Triggers

```html
<v-tabs width="full">
   ...
</v-tabs>
```

### With Pill Variant

```html
<v-tabs variant="pill">
   ...
</v-tabs>
```

### With Custom Titles

Since `v-tab-title` supports content projection, you can include icons or other elements easily.

```html
<v-tabs>
  <v-tab>
    <v-tab-title>
        <span class="icon">🔥</span> Fire Tab
    </v-tab-title>
    <v-tab-content>...</v-tab-content>
  </v-tab>
</v-tabs>
```
