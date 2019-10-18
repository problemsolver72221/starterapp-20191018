# feature-pg-settings

Provides app settings that can be used in both client and server.
In-memory cache values are updated based on the setting `server.settings.interval`

## Usage

```js
import { getSetting } from 'src/features/feature-pg-settings'
getSetting('server.settings.interval')
```