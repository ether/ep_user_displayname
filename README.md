![Publish Status](https://github.com/ether/ep_user_displayname/workflows/Node.js%20Package/badge.svg) ![Backend Tests Status](https://github.com/ether/ep_user_displayname/workflows/Backend%20tests/badge.svg)

# ep\_user\_displayname

Etherpad plugin that initializes the name displayed in the user list from a
value in the user's account settings. The account settings can come from
`settings.json` or an authentication plugin such as
[ep\_openid\_connect](https://github.com/ether/ep_openid_connect).

By default, users are not allowed to change their displayname if the displayname
is set in the user's account settings. This restriction can be changed
site-wide or with per-user overrides.

This plugin has no effect unless the `requireAuthentication` setting is `true`.

## Configuration

#### Example

```json
  "requireAuthentication": true,
  "ep_user_displayname": {
    "changeableByDefault": false
  },
  "users": {
    "admin": {
      "displayname": "Special User",
      "displaynameChangeable": true
    },
    "guest": {
      "displayname": "Read-Only Guest",
      "readOnly": true
    },
    "foo": {
      "displayname": "Ordinary User"
    }
  },
```

#### Details

  * `requireAuthentication`: Must be explicitly set to `true` to enable this
    plugin.
  * `ep_user_displayname.changeableByDefault` (optional, defaults to `false`):
    The default value for a user's `displaynameChangeable` setting if not
    explicitly set.
  * `users[username].displayname` (optional, defaults to unset): The user's
    displayname. If this is set and the user's `displaynameChangeable` setting
    is `false`, the user's displayname is always forced to this value. If this
    is set and the user's `displaynameChangeable` setting is `true`, this only
    serves as the displayname's initial value (it is ignored if the user's
    displayname is already known from a previous visit). If this is unset, the
    user's displayname is initially unset and the user is allowed to change
    their displayname to any value they want.
  * `users[username].displaynameChangeable` (optional, defaults to the value of
    `ep_user_displayname.changeableByDefault`): Whether the user is allowed to
    change their displayname. Note that a user's displayname is always
    changeable if their `displayname` setting is unset.

## Copyright and License

Copyright © 2022 Richard Hansen <rhansen@rhansen.org> and the
ep\_user\_displayname authors and contributors

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License"); you
may not use this file except in compliance with the License. You may obtain a
copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
