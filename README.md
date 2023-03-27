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
  "phone": "501-955-331",
  "texts": "Mollitia qui unde ab fugiat blanditiis perspiciatis dolores suscipit voluptatum. Eum nobis totam similique harum commodi. Velit commodi quas aut quaerat blanditiis.
\nOdit ut doloribus nam aspernatur nostrum alias eum. A quam dolorum repellat labore. Nulla iste nesciunt.
\nTenetur cumque eius officiis a. Occaecati quo voluptatibus architecto. Eos soluta sapiente dolor sint doloribus molestiae ab quos quisquam. Iure nam dicta nemo.
\nId nesciunt corrupti alias. Ab blanditiis amet ab modi sunt voluptates ratione. Dolor corrupti inventore minima deserunt cumque expedita cupiditate maiores delectus. Repudiandae quisquam necessitatibus fugit ut neque praesentium. Porro ad excepturi molestias recusandae.
\nLabore alias tempora nesciunt inventore nemo maiores numquam. Consectetur eum optio suscipit aut neque. Voluptatem commodi tempora. Dolore accusantium perspiciatis accusantium fugit repudiandae."
}
```

creating arrays

```js
import mocko from 'mocko';

mocko({
  'genres#5': 'faker.music',
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

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)