## Overview
Client for interfacing api and web.

## Use
Import the client within a file in `/web`:
```
import { client } from '/api-client/client'
```
The `client` object has attributes for each api module. Module attributes are functions leading to each module's use cases and return an http response. Access the data returned from the use case by accessing `response.data` For example:

```
const res = await client.users.getUserById('someUserId')
const user = res.data
```