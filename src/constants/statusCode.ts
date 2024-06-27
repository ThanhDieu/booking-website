
class StatusCode {
    SUCCESS = 200;
    NOT_FOUND = 404;
    UN_AUTH = 401;
    FORBIDDEN = 403;
    SEVER_ERROR = 500;
    SEVER_SHUTDOWN = 502; 
}

const statusCode = new StatusCode();
export default statusCode;