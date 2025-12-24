import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  // On teste Google car ton site n'est pas encore sur internet public
  http.get('http://google.com'); 
  sleep(1);
}
