let baseUrl = ''
if (__WEBPACK__ENV === 'dev') {
    baseUrl = 'http://localhost:8090/api'
} else {
    baseUrl = 'http://localhost:8080'
}
export default baseUrl