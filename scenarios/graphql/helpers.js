import http from 'k6/http';
import { check } from 'k6';
import { environment } from '../../k6.config.js';

export function prefetch(locale) {
  const jar = http.cookieJar();
  http.get(`${environment.BASE_URL}/${locale.toLowerCase()}/api/v1/prefetch`);
  return jar;
}

export function graphqlRequest(payload, jar) {
  const headers = {
    'content-type': 'application/json',
    'x-fs': 'k6',
    'x-fs-app': 'k6',
  };
  const response = http.post(environment.GRAPHQL_HUB_URL, payload, {
    headers,
    jar,
    tags: { type: 'graphql' },
  });
  const responseBody = parseResponse(response.body);
  check(response, {
    [`gql_${JSON.parse(payload).operationName}`]: r => {
      console.log(
        environment.GRAPHQL_HUB_URL,
        JSON.parse(payload).operationName,
        r.status,
        `${r.timings.duration}ms`,
        responseBody.errors ? responseBody.errors : 'OK'
      );
      return r.status === 200 && !responseBody.errors;
    },
  });
  return response;
}

function parseResponse(body) {
  try {
    const responseBody = JSON.parse(body);
    return responseBody;
  } catch (error) {
    return { errors: 'invalid response' };
  }
}
