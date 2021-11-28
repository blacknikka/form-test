import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const contact: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('contact'); 
  console.log(event.body);
  return formatJSONResponse({
    message: `contact ${event.body.name}`,
    event,
  });
}

export const main = middyfy(contact);
