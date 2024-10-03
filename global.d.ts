declare module 'node:http' {
    import * as http from 'http';
    export const { createServer, request } = http;
    export default http;
}