// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { parse } from 'lambda-multipart-parser';
import { writeFileSync } from 'fs';
import { Buffer } from 'buffer';

// import schema from './schema';

const contact = async (event) => {
  console.log('contact');
  console.log('header--------------');
  console.log(event.headers);
  console.log('parsed--------------');
  const parsed = await parse(event);
  console.log(parsed);

  // save each file
  Array.from(parsed.files).forEach((f) => {
    const data = Buffer.from(f.content);
    writeFileSync('./tmp/' + f.filename, data);
  });

  return formatJSONResponse({
    name: parsed.name,
    email: parsed.email,
    details: parsed.details,
    files: Array.from(parsed.files).map((f) => {
      return f.filename;
    }),
  });
};

export const main = middyfy(contact);
