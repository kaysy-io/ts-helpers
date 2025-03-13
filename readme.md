# @kaysy/ts-helpers

Typescript helpers for web applications.

## Table of Contents

- [Installation](#installation)
- [Email Address Validator](#email-address-validator)
- [Length Aware Paginator](#length-aware-paginator)
- [Array](#array)
    - [duplicate](#duplicate)
    - [empty](#empty)
    - [first](#first)
    - [groupBy](#groupBy)
    - [last](#last)
    - [unique](#unique)
- [String](#string)
    - [base64Decode](#base64decode)
    - [base64Encode](#base64encode)
    - [camel](#camel)
    - [domainWithoutSchema](#domainwithoutschema)
    - [dottedPath](#dottedpath)
    - [escapeForRegex](#escapeforregex)
    - [isAlphaNum](#isalphanum)
    - [isHex](#ishex)
    - [isValidEmail](#isvalidemail)
    - [isValidUrl](#isvalidurl)
    - [isLocalhost](#islocalhost)
    - [kebab](#kebab)
    - [lcfirst](#lcfirst)
    - [matches](#matches)
    - [path](#path)
    - [replace](#replace)
    - [replaceWithOne](#replacewithone)
    - [snake](#snake)
    - [studly](#studly)
    - [trim](#trim)
    - [trimEnd](#trimend)
    - [trimStart](#trimstart)
    - [ucfirst](#ucfirst)
    - [ucwords](#ucwords)
- [Helpers](#helpers)
    - [encrypt](#encrypt)
    - [except](#except)
    - [hash](#hash)
    - [get](#get)
    - [isProduction](#isProduction)
    - [mongourl](#mongourl)
    - [only](#only)
    - [queryString](#queryString)
    - [random](#random)
    - [truthy](#truthy)
    - [url](#url)
    - [valueRetriever](#valueRetriever)
    - [verifyHash](#verifyHash)
    - [when](#when)
    - [whenHas](#whenHas)

## Installation

To install this package, run:

```
npm install @kaysy/ts-helpers
```

## Email Address Validator

The ```EmailValidator``` class provides methods to validate email addresses using simple validation rules. It checks the local part and domain part of the email to ensure they meet minimum and maximum length requirements. This class does not use complex regular expressions but instead focuses on basic structural validation.

**Usage Example**

```ts
import { EmailValidator } from '@kaysy/ts-helpers';

const validator = new EmailValidator();

const email = 'test@example.com';

if (validator.validate(email)) {
    console.log(`${email} is a valid email address.`);
} else {
    console.log(`${email} is not a valid email address.`);
}
```

**Response:**

```
test@example.com is a valid email address.
```

## Length Aware Paginator

This package contains a paginator support class, which builds a JSON response in a standard format, if all the paginator details are submitted.

**Example:**

```ts
import { LengthAwarePaginator } from '@kaysy/ts-helpers';

const paginator = new LengthAwarePaginator([1, 2, 3], 100, 10, 1);
const json = paginator.toJSON();
console.log(json);
```

**Response:**

```json
{
  "current_page": 1,
  "data": [1, 2, 3],
  "first_page_url": "http://example.com?page=1",
  "from": 1,
  "last_page": 10,
  "last_page_url": "http://example.com?page=10",
  "next_page_url": "http://example.com?page=2",
  "path": "http://example.com",
  "per_page": 10,
  "prev_page_url": null,
  "to": 3,
  "total": 100
}
```

## Array

The ```Arr``` class contains static helper function for operating on an array. Most of the helper functions take an array as the first parameter and operate on it.

### duplicate

Duplicates the given data for the given count and returns an array.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.duplicate('data', 3);
console.log(result);
```

**Response:**

```json
["data", "data", "data"]
```

### empty

Returns true if the given array is empty.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.empty([]);
console.log(result);
```

**Response:**

```
true
```

### first

Gets the first element in the array.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.first([1, 2, 3]);
console.log(result);
```

**Response:**

```
1
```

### groupBy

Groups the given array by the identifier into a Map and returns it.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.groupBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id');
console.log(result);
```

**Response:**

```
Map { 1 => [ { id: 1 }, { id: 1 } ], 2 => [ { id: 2 } ] }
```

### last

Gets the last element in the array.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.last([1, 2, 3]);
console.log(result);
```

**Response:**

```
3
```

### unique

Returns the unique values in the source array in a new array.

**Example:**

```ts
import { Arr } from '@kaysy/ts-helpers';

const result = Arr.unique([1, 2, 2, 3, 3, 3]);
console.log(result);
```

**Response:**

```json
[1, 2, 3]
```

## String

The ```Str``` class contains static helper function for string manipulations. The class has helper functions for encoding, decoding, case conversions, and many more.

### base64Decode

Decodes a base64 string to the given encoding.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const decoded = Str.base64Decode('c3RyaW5n');
console.log(decoded);
```

**Response:**

```
string
```

### base64Encode

Encodes a utf8 string to base64.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const encoded = Str.base64Encode('string');
console.log(encoded);
```

**Response:**

```
c3RyaW5n
```

### camel

Convert a value to camel case.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const camelCase = Str.camel('hello_world');
console.log(camelCase);
```

**Response:**

```
helloWorld
```

### domainWithoutSchema

Clears the schema part from the domain and returns it. Also removes any trailing/leading slashes.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const domain = Str.domainWithoutSchema('https://example.com/');
console.log(domain);
```

**Response:**

```
example.com
```

### dottedPath

Returns a dotted path of the given path.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const dotted = Str.dottedPath('/path/to/resource');
console.log(dotted);
```

**Response:**

```
path.to.resource
```

### escapeForRegex

Returns a regex escaped pattern.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const escaped = Str.escapeForRegex('hello.*+?^${}()|[]\\');
console.log(escaped);
```

**Response:**

```
hello\.\*\+\?\^\$\{\}\(\)\|\[\]\\
```

### isAlphaNum

Checks if a value is an alphanumeric string containing only chars from 0-9, A-Z and a-z.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const isAlphaNum = Str.isAlphaNum('abc123');
console.log(isAlphaNum);
```

**Response:**

```
true
```

### isHex

Checks if a value is a hex string or not.

**Example:**

```ts
import { Str } from '@kaysy/ts-helpers';

const isHex = Str.isHex('a1b2c3');
console.log(isHex);
```

**Response:**

```
true
```

## Helpers

These are commonly used utility functions which can can be used in all Typescript applications. Some of them, with examples are given below.

### encrypt
Encrypts the given plain text using the given algorithm and parameters.

**Example:**

```ts
import { encrypt } from '@kaysy/ts-helpers';

const encrypted = encrypt('plainText', 'randomkey');
console.log(encrypted.toString());
```

**Response:**

```
vxUD842@354820198dhsg.s'27362
```

### except

Returns a new Object leaving out the given keys.

**Example:**

```ts
import { except } from '@kaysy/ts-helpers';

const obj = { a: 1, b: 2, c: 3 };
const result = except(obj, ['b']);
console.log(result);
```

**Response:**

```json
{ "a": 1, "c": 3 }
```

### hash

Returns the hash of the given value.

**Example:**

```ts
import { hash } from '@kaysy/ts-helpers';

const hashedValue = await hash('value');
console.log(hashedValue);
```

**Response:**

```
$2a$10$...
```

### get

Returns a property from the given object using dot notation.

**Example:**

```ts
import { get } from '@kaysy/ts-helpers';

const obj = { a: { b: { c: 3 } } };
const value = get(obj, 'a.b.c');
console.log(value);
```

**Response:**

```
3
```

### isProduction

Returns true if the application is running in production. This checks the NODE_ENV environment field value.

**Example:**

```ts
import { isProduction } from '@kaysy/ts-helpers';

const result = isProduction();
console.log(result);
```

**Response:**

```
false
```

### mongourl

Returns a mongodb connection url from the given server details.

**Example:**

```ts
import { mongourl } from '@kaysy/ts-helpers';

const option = {
  hosts: 'localhost:27017',
  database: 'test',
};
const url = mongourl(option);
console.log(url);
```

**Response:**

```
mongodb://localhost:27017/test
```

### only

Returns a new Object containing only the given keys.

**Example:**

```ts
import { only } from '@kaysy/ts-helpers';

const obj = { a: 1, b: 2, c: 3 };
const result = only(obj, ['a', 'c']);
console.log(result);
```

**Response:**

```json
{ "a": 1, "c": 3 }
```

### queryString

Returns a simple query string without any encoding.

**Example:**

```ts
import { queryString } from '@kaysy/ts-helpers';

const queries = { a: 1, b: 2 };
const result = queryString(queries);
console.log(result);
```

**Response:**

```
a=1&b=2
```

### random

Returns a cryptographically secure random string with given number of characters.

**Example:**

```ts
import { random } from '@kaysy/ts-helpers';

const result = random(10);
console.log(result);
```

**Response:**

```
a1b2c3d4e5
```

### truthy

Returns true if the given value is true.

**Example:**

```ts
import { truthy } from '@kaysy/ts-helpers';

const result = truthy([1, 2, 3]);
console.log(result);
```

**Response:**

```
true
```

### url

Returns a url string from the given data.

**Example:**

```ts
import { url } from '@kaysy/ts-helpers';

const result = url('/endpoint', 'http://localhost', { a: 1 });
console.log(result);
```

**Response:**

```
http://localhost/endpoint?a=1
```

### valueRetriever

Returns a value retriever function for the given parameter.

**Example:**

```ts
import { valueRetriever } from '@kaysy/ts-helpers';

const retriever = valueRetriever('a.b');
const value = retriever({ a: { b: 3 } });
console.log(value);
```

**Response:**

```
3
```

### verifyHash

Verify whether the given value and the hash matches.

**Example:**

```ts
import { verifyHash } from '@kaysy/ts-helpers';

const result = await verifyHash('value', '$2a$10$...');
console.log(result);
```

**Response:**

```
true
```

### when

When the given value is true, execute the given callback.

**Example:**

```ts
import { when } from '@kaysy/ts-helpers';

const result = when(true, (value) => value + 1);
console.log(result);
```

**Response:**

```
2
```

### whenHas

When the given value exists, execute the given callback.

**Example:**

```ts
import { whenHas } from '@kaysy/ts-helpers';

const result = whenHas('value', (value) => value.toUpperCase());
console.log(result);
```

**Response:**

```
VALUE
```