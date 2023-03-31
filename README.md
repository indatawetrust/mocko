# mocko

super simple schema based mock data generator. works integrated with fakerjs.

## Installation

```bash
npm i mocko
```

## Usage

the scheme runs entirely on fakerjs functions. You can check the faker api for more. https://fakerjs.dev/api/

```js
import mocko from 'mocko';

mocko({
  id: 'database.mongodbObjectId',
  name: 'name.fullName',
  photo: 'internet.avatar',
})
```

```json
{
  "id": "b0d11bd9f60fedcf6beee3fe",
  "name": "Bethany Lebsack III",
  "photo": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/688.jpg"
}
```

use of parameters

```js
import mocko from 'mocko';

mocko({
  phone: ['phone.number', '501-###-###'],
  texts: ['lorem.paragraphs', 5, '<br/>\n'],
})
```

```json
{
  "phone": "501-111-741",
  "texts": "Ratione animi corrupti deleniti molestias commodi architecto eligendi. Quaerat perspiciatis aliquam velit nostrum aspernatur. Veritatis provident facere nulla tenetur. Voluptates commodi illum laborum.
\nQuas voluptas commodi commodi quas deleniti quo minima. Voluptatibus quo nulla fugit quam sit. Eaque doloribus iusto minus animi distinctio beatae magni similique. Reiciendis quo a totam veritatis."
}
```

creating arrays

```js
import mocko from 'mocko';

mocko({
  'genres#5': 'music.genre',
  'colors#3': ['internet.color', 50, 50, 50],
})
```

```json
{
  "genres": [
    "Latin",
    "Metal",
    "Electronic",
    "Stage And Screen",
    "Non Music"
  ],
  "colors": [
    "#4e3c29",
    "#5b8321",
    "#744739"
  ]
}
```

mocko works in English by default. You can use changeLocale util to change locale.

https://fakerjs.dev/guide/localization.html#available-locales

```js
import mocko, { changeLocale } from 'mocko';

await changeLocale('tr')
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)